const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Session)
Session.belongsTo(User)

User.hasMany(Readinglist, { as: 'readings' })
Readinglist.belongsTo(User)
Blog.hasMany(Readinglist)
Readinglist.belongsTo(Blog)
module.exports = {
  Blog, User, Readinglist, Session
}