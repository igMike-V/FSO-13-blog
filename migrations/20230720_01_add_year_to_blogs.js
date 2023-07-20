const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        isWithinRange(value) {
          const date = new Date()
          if (isNaN(value) || value < 1991 || value > date.getFullYear()) {
            throw new Error(`Value must be betwee 1991 and ${date.getFullYear()}`)
          }
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}