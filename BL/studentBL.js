const studentModel = require('../BL/studentModel')

const getAllStudents = async () => {
    return new Promise((resolve, reject) => {
        studentModel.find({}, (err, data)=>{
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const getStudentById = async (args) => {
    return new Promise((resolve, reject) => {
        studentModel.findOne({id: args.id}, (err, data)=> {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const getAllStudentsByFaculty = async (args) => {
    return new Promise((resolve, reject) =>{
        studentModel.find({faculty: args.faculty}, (err, data)=>{
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const addNewStudent = async (obj) => {
    return new Promise((resolve, reject) => {
        let student = studentModel({
            "id" : obj.id,
            "name" : obj.name,
            "faculty" : obj.faculty,
            "grades" : []
        })
        student.save((err,data)=>{
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const getStudentGradesAvg = async (id) => 
{  
    let student = await new Promise((resolve, reject) => {
        studentModel.findOne({id: id.id}, (err, data)=> {
            if (err) reject(err)
            else resolve(data)
        })
    })
    let mapGrades = student.grades.map(grade=> grade.points);
    if (mapGrades.length == 0) return 0;
    else if (mapGrades.length == 1) return mapGrades[0];
    else if (mapGrades.length > 1) return mapGrades.reduce( ( p, c ) => p + c, 0 ) / mapGrades.length;
}

const addNewGradeToStudent = async (args) => 
{
    let student = await new Promise((resolve, reject) => {
        studentModel.findOne({id: args.id}, (err, data)=> {
            if (err) reject(err)
            else resolve(data)
        })
    })
    let profession = args.profession;
    let points = args.points;
    await new Promise((resolve, reject) => {
        student.grades.push({profession : profession, points : points})
        console.log(student)
        studentModel.replaceOne({id: args.id},student, (err, data)=>{
            if (err) reject(err);
            else resolve(data);
        })
    })
    return student
}

const UpdateStudentNameFaculty = async (args) => 
{
    let student = new Promise((resolve, reject) => {
        studentModel.findOneAndUpdate({id: args.id},{name: args.name, faculty: args.faculty}, (err, data)=>{
            if (err) reject(err)
            else resolve(data)
        })
    })
    return student
}

const DeleteStudent = async (args) => 
{ 
    await new Promise((resolve, reject) => {
        studentModel.findOneAndDelete({id: args.id}, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

    return new Promise((resolve, reject) => {
        studentModel.find({}, (err, data)=>{
            if (err) reject(err)
            else resolve(data)
        })
    })

}

module.exports = { getAllStudents, getStudentById, getAllStudentsByFaculty, addNewStudent, getStudentGradesAvg, addNewGradeToStudent, UpdateStudentNameFaculty, DeleteStudent }

