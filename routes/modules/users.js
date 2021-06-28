const express = require('express')
const db = require('../../models')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = db.User
const router = express.Router()

router.get('/login', (req, res) => {
  let error = req.flash('error')
  if (error.length === 0) {
    error = res.locals.warning_msg
  }
  if (error[0] === 'Missing credentials') {
    error[0] = '請輸入有效 email 或密碼！'
  }
  res.render('login', { warning_msg: error })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填資料。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      errors.push({ message: '該 email 已經被註冊。' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
  })
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '您已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
