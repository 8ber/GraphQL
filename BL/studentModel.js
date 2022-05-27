const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema({
    "id" : Number,
    "name" : String,
    "faculty" : String,
    "grades" : Array
})


module.exports = mongoose.model('students', studentSchema)