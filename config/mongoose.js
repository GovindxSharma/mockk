const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://user:harder@projects.wxafwea.mongodb.net/?retryWrites=true&w=majority')

const db =mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting db'))
db.once('open',()=>console.log('DataBase Connected '))

module.exports =db;