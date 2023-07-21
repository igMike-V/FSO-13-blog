const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, foreignKey: 'userId' })
Blog.belongsToMany(User, { through: Readinglist, foreignKey: 'blogId' })


module.exports = {
  Blog, User, Readinglist
}