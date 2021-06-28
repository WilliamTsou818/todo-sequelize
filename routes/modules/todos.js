const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user.id
  const name = req.body.name
  return Todo.create({ name: name, UserId: userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => console.log(error))
})

module.exports = router
