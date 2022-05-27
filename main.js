// importing frameworks, middlewares..
const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql')
const BL = require('./BL/studentBL')
require('./configs/mongoose')


// shaping a schema for the GraphQL
let appSchema = buildSchema(`
type Query 
{
getAllStudents : [Student],
getStudentById(id : Int) : Student,
getAllStudentsByFaculty(faculty : String) : [Student],
getStudentGradesAvg(id : Int) : Float
},
type Mutation 
{
addNewStudent(id:Int, name:String, faculty:String) : Student,
addNewGradeToStudent(id : Int, profession : String, points: Int) : Student,
UpdateStudentNameFaculty( id:Int, name : String, faculty : String) : Student,
DeleteStudent(id:Int) : [Student]
},
type Student 
{
id : Int,
name : String,
faculty : String,
grades : [Grade]
},
type Grade
{
    profession : String,
    points : Int
}`)

// setting my express app
let app = express();
 
var cors = require('cors')
app.use(cors())

// setting my mapping function to the BL (so it will work with the schema)
let rootFunctions = {
    getAllStudents : BL.getAllStudents,
    getStudentById : BL.getStudentById,
    getAllStudentsByFaculty : BL.getAllStudentsByFaculty,
    addNewStudent : BL.addNewStudent,
    getStudentGradesAvg : BL.getStudentGradesAvg,
    addNewGradeToStudent : BL.addNewGradeToStudent,
    UpdateStudentNameFaculty : BL.UpdateStudentNameFaculty,
    DeleteStudent : BL.DeleteStudent
}



// defining the usage of graphQL - the parameters
app.use('/graphql',express_graphql.graphqlHTTP({
    schema : appSchema, //what schema to use
    rootValue : rootFunctions  , // mapping function -> from schema to BL
    graphiql : true //use the build in graphql client for testing?
}))

// starting the server
app.listen(4000);