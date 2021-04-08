import {Router} from 'express'
import StudentController from '../controllers/StudentController'
import {check} from 'express-validator'
import { StudentGrade} from '../entity/Student'


const router = Router()


router.post('/student',[
    check('fio').notEmpty().withMessage("Данные пользователя не могут быть пустыми").isString().withMessage("Данные пользователя должны быть строкой").isLength({ min: 3 }).withMessage("Минимальная длина данных 3 символа"),
    check('birthday').notEmpty().withMessage("День рождения пользователя не может быть пустым").isDate().withMessage("День рождения пользователя должен содержать только дату").custom( (birthday:Date)=> {
        if(new Date(birthday) > new Date()) return false;
        else return true
    } ).withMessage("День рождения пользователя должен быть больше текущей даты "),
    check('grade').notEmpty().withMessage("Оценка пользователя не должна быть пустой").custom( (grade:StudentGrade) => Object.values(StudentGrade).includes(grade)).withMessage("Такой оценки не существует")
], StudentController.postStudent)

router.get('/student',StudentController.getStudent)

router.get('/student/:id',[check('id').notEmpty().withMessage("ID пользователя не может быть пустым").isNumeric().withMessage("ID пользователя должен содержать только числа")], StudentController.getOneStudent)

router.put('/student/:id', [check('id').notEmpty().withMessage("ID пользователя не может быть пустым").isNumeric().withMessage("ID пользователя должен содержать только числа")],StudentController.updateStudent)

router.delete('/student/:id',[check('id').notEmpty().withMessage("ID пользователя не может быть пустым").isNumeric().withMessage("ID пользователя должен содержать только числа")], StudentController.deleteStudent)

export default router