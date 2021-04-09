import {check} from 'express-validator'
import * as errors from '../helpers/errors.json'
import { StudentGrade} from '../entity/Student'

export const studentValidation = [
    check('fio').notEmpty().withMessage(errors.EMISSPARAM)
                .isString().withMessage(errors.ETYPE)
                .isLength({ min: 3 }).withMessage(errors.ELENGTH),
    check('birthday').notEmpty().withMessage(errors.EMISSPARAM)
                    .isDate().withMessage(errors.EDATE)
                    .custom( (birthday:Date)=> (new Date(birthday) < new Date())).withMessage(errors.EDATELIMIT),
    check('grade').notEmpty().withMessage(errors.EMISSPARAM)
                  .custom( (grade:StudentGrade) => Object.values(StudentGrade).includes(grade)).withMessage(errors.EWRONGGRADE)
];

export const idValidation = [
    check('id').notEmpty().withMessage(errors.EMISSPARAM)
    .isInt({ gt: 0 }).withMessage(errors.ENOTNUMBER)
];

export const studentColumnValidation = [
    check('column').notEmpty().withMessage(errors.EMISSPARAM)
                   .isString().withMessage(errors.ETYPE)
                   .custom( (column) => ['id', 'fio', 'birthday', 'grade'].includes(column)).withMessage(errors.EWRONGCOLUMN),

    check('orderBy').notEmpty().withMessage(errors.EMISSPARAM)
                    .isString().withMessage(errors.ETYPE)
                    .custom( (orderBy) => ['ASC', 'DESC'].includes(orderBy)).withMessage(errors.EWRONGORDER),

    check('limit').notEmpty().withMessage(errors.EMISSPARAM)
                  .isInt({ gt: -1 }).withMessage(errors.ENOTNUMBER),

    check('offset').notEmpty().withMessage(errors.EMISSPARAM)
                   .isInt({ gt: -1 }).withMessage(errors.ENOTNUMBER),
];