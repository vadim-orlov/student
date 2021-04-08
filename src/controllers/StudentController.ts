import {Request, Response } from "express";
import { getRepository } from "typeorm";
import {Student, StudentGrade} from '../entity/Student'
import { body, validationResult } from 'express-validator';


interface iStudent{
    fio:string,
    birthday:Date,
    grade: StudentGrade
}



class StudentController {

    static postStudent =  async (req:Request, res: Response) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const newStudent:iStudent = {
            fio: req.body.fio,
            birthday: req.body.birthday,
            grade: req.body.grade
                }
        const student = getRepository(Student).create(newStudent)
        const result = await getRepository(Student).save(student)
        return res.status(200).json({
            success:true,
            body: result
        })
    }


    static getStudent = async  (req: Request, res: Response) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await getRepository(Student).find();

        return res.status(200).json({
            success:true,
            body: result
        })
    }


    static getOneStudent = async (req: Request, res: Response) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const id = req.params.id
        const student = await getRepository(Student).findOne(id)
        if(student) return res.status(200).json({
            success:true,
            body: student
        })
        else return res.status(404).json({
            success:false,
            body: 'Student not found'
        })
    }


    static updateStudent = async (req: Request, res: Response) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const student = await getRepository(Student).findOne(req.params.id)
        if(student) {
            getRepository(Student).merge(student, req.body)
            const result = await getRepository(Student).save(student)
            
            if(student)return  res.status(200).json({
                success:true,
                body: result, msg: 'Student updated successfully'
            })
        }
        else return  res.status(404).json({
            success:false,
            body: 'Student not found'
        })
    }


    static deleteStudent = async(req: Request, res: Response) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const student = await getRepository(Student).delete(req.params.id);

        if(student.affected != 0) return res.status(200).json({
            success:true,
            body: 'Student deleted successfully'
        })
        else return res.status(200).json({
            success:false,
            body: 'Student not found'
        })
    }
}



export default StudentController