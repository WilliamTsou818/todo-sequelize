const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId: userId }
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
