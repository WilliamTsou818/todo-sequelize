const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Email 尚未註冊！' })
      }
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return done(null, false, { message: '密碼錯誤！' })
        }
        return done(null, user)
      })
    })
      .catch((err) => done(err, false))
  }))

  // facebook 驗證策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user) return done(null, user)
        // 如果不在資料庫，則隨機創立密碼並註冊
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      user = user.toJSON()
      done(null, user)
    })
      .catch((err) => done(err, null))
  })
}
