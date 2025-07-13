import Student from '../models/student.js';

//create part
export function createStudent(req,res){

     const student = new Student(req.body)

     student.save().then(

        ()=>{
            res.json({
                message: "Student is created"
            })
        }
    
     ).catch(()=>{
        res.json({
             message: "Student is not created"
        })
    })
}

//view part
export function getStudent(req,res){

    Student.find().then(
        (studentList)=>{
            res.json({
                list : studentList
            })
        }
    )
}

//delete part
export function deleteStudent(req,res){
    Student.deleteOne({name : req.body.name}).then(
        ()=>{
            res.json(
                {
                    message : "student deleted successfully"
                }
            )
        }
    )
}