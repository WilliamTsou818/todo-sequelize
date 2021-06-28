'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'isDone', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Todos', 'isDone', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
}
