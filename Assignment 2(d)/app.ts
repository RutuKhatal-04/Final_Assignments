<<<<<<< HEAD
// import req from "express/lib/request";
// import express from ('express');
// import { filteredPassedStudent,namesOfStudent,sortWithGrade,avgAge } from "./logic"
// const app=express();

// const PORT=8000;
// app.use(express.json());

// app.get('/filter',(req,res)=>{
//     const student=req.body;
//     let result=filteredPassedStudent(student)
//     return res.json(result)
// })



// app.get('/name',(req,res)=>{
//     const student=req.body;
//     let result=namesOfStudent(student)
//     return res.json(result)
// })



// app.get('/grade',(req,res)=>{
//     const student=req.body;
//     let result=sortWithGrade(student)
//     return res.json(result)
// })



// app.get('/age',(req,res)=>{
//     const student=req.body;
//     let result=avgAge(student)
//     return res.json(result)
// })


// app.listen(PORT,()=>{console.log("Server started")})



=======
>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
import express, { Request, Response } from 'express';
import { filteredPassedStudent, namesOfStudent, sortWithGrade, avgAge } from './logic';

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/filter', (req: Request, res: Response) => {
    const students = req.body;
    let result = filteredPassedStudent(students);
    res.json(result);
});

app.get('/name', (req: Request, res: Response) => {
    const students = req.body;
    let result = namesOfStudent(students);
    res.json(result);
});

app.get('/grade',(req: Request, res: Response) => {
    const students = req.body;
    let result = sortWithGrade(students);
    res.json(result);
});

app.get('/age',(req: Request, res: Response) => {
    const students = req.body;
    let result = avgAge(students);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
