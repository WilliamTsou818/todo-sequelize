const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => console.log(error))
})

module.exports = router
