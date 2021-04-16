import {Request, Response } from "express";
import { getRepository } from "typeorm";
import {Student, StudentGrade} from '../entity/Student'
import { validationResult } from 'express-validator';
import * as CustomErrors from '../helpers/errors.json'
import { iStudent,ReqQuery } from '../helpers/types'

class StudentController {

    static postStudent =  async (req:Request, res: Response) => {
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw errors.array().map( error=> error.msg )
            
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
        }catch(error){
            console.log(error);
            res.status(400).json({
                success: false, 
                body: ( Array.isArray(error) && error[0].en || error.en) ? error : CustomErrors.ECOMMON
            })
        }
    }


    static getStudents = async  (req: Request<any,any, any, ReqQuery>, res: Response) => {
            try {
                const errors = validationResult(req);
        
                if (!errors.isEmpty()) throw errors.array().map( error=> error.msg );

                let { column, orderBy, limit, offset} = req.query;

                const  [result, total] = await getRepository(Student)
                .findAndCount(
                    {
                        order: { [column]: orderBy },
                        take: limit,
                        skip: offset
                    }
                );

                return res.status(200).json({
                    success:true,
                    body: {
                        total,
                        result,
                        settings:{
                            filterColumns:["id", "fio","birthday","grade"],
                            filterDirection:["ASC", "DESC"],
                            gradeTypes: StudentGrade
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false, 
                    body: ( Array.isArray(error) && error[0].en || error.en) ? error : CustomErrors.ECOMMON
                })
            }
    }


    static getOneStudent = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw errors.array().map( error=> error.msg )
            
            const id = req.params.id
            const student = await getRepository(Student).findOne(id)
            if(student) return res.status(200).json({
                success:true,
                body: student
            })
            else throw CustomErrors.ENOTFOUND
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false, 
                body: ( Array.isArray(error) && error[0].en || error.en) ? error : CustomErrors.ECOMMON
            })
        }
    
    }


    static updateStudent = async (req: Request, res: Response) => {
            try {
                const errors = validationResult(req);
        
                if (!errors.isEmpty()) throw errors.array().map( error=> error.msg )
        
                const student = await getRepository(Student).findOne(req.params.id)
                if(student) {
                    getRepository(Student).merge(student, req.body)
                    const result = await getRepository(Student).save(student)
                    
                    if(student)return  res.status(200).json({
                        success:true,
                        body: result
                    })
                }
                else throw CustomErrors.ENOTFOUND
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false, 
                    body: ( Array.isArray(error) && error[0].en || error.en) ? error : CustomErrors.ECOMMON
                })
            }
     
    }


    static deleteStudent = async(req: Request, res: Response) => {
            try {
                const errors = validationResult(req);
        
                if (!errors.isEmpty()) throw errors.array().map( error=> error.msg )
        
                const student = await getRepository(Student).delete(req.params.id);
        
                if(student.affected != 0) return res.status(200).json({
                    success: true,
                    body: 'Student deleted successfully'
                })
                else  throw CustomErrors.ENOTFOUND
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false, 
                    body: ( Array.isArray(error) && error[0].en || error.en) ? error : CustomErrors.ECOMMON
                })
            }
    }
}

export default StudentController