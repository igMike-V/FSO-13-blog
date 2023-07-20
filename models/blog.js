const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Blog extends Model {};

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    year: {
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
    }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
})

module.exports = Blog