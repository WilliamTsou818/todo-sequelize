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
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  return Todo.findOne({ where: { id: todoId, UserId: userId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ where: { id: todoId, UserId: userId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${todoId}`))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  return Todo.findOne({ where: { id: todoId, UserId: userId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
