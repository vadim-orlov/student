import { StudentGrade } from '../entity/Student'

export interface iStudent{
    fio:string,
    birthday:Date,
    grade: StudentGrade
}

export type ReqQuery = { 
    column:'id' | 'fio' | 'birthday' | 'grade',
    orderBy: 'ASC' | 'DESC',
    limit:number,
    offset:number; 
 }