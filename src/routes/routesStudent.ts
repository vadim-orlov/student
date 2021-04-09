import {Router} from 'express'
import StudentController from '../controllers/StudentController'
import { studentValidation, idValidation, studentColumnValidation } from '../helpers/vaidation'

const router = Router();

// MODEL FOR SWAGGER
/** /
*@swagger
* components:
*   schemas:
*     Student:
*       type: object
*       required:
*         - fio
*         - birthday
*         - grade
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the student.
*         fio:
*           type: string
*           description: The name, lastname of student.
*         birthday:
*           type: string
*           format: date
*           description: The birthday of the student.
*         grade:
*           type: string
*           description: The grade of student.
*           enum: [неудовлетворительно, удовлетворительно,хорошо,отлично]
*       example:
*          fio: Atamyradov Meylis
*          birthday: 1994-04-28
*          grade: хорошо
*     SuccessResponseArray:
*       type: object
*       properties:
*         success:
*           type: boolean
*           description: The response status
*           example: true
*         body:
*           type: array
*           items:
*             $ref: '#/components/schemas/Student'
*     SuccessResponseSingle:
*       type: object
*       properties:
*         success:
*           type: boolean
*           description: The response status
*           example: true
*         body:
*           $ref: '#/components/schemas/Student'
*     ErrorResponse:
*       type: object
*       properties:
*         success:
*           type: boolean
*           description: The response status
*           example: false
*         body:
*           type: object
*           properties: 
*             en: 
*               type: string
*               description: Error message in English
*               example: Birthday must be a date
*             ru: 
*               type: string
*               description: Error message in Russian
*               example: День рождения пользователя должен содержать только дату
*     ErrorResponseArray:
*       type: object
*       properties:
*         success:
*           type: boolean
*           description: The response status
*           example: false
*         body:
*           type: array
*           items:
*             type: object
*             properties:               
*               en:                 
*                 type: string                
*                 description: Error message in English 
*                 example: Birthday must be a date 
*               ru:                 
*                 type: string                
*                 description: Error message in Russian 
*                 example: День рождения пользователя должен содержать только дату
*/


 // TAGS FOR SWAGGER
/** /
*@swagger
*tags:
*  name: Student
*  description: API to manage students.
*/


// GET STUDENTS
   /**
 * @swagger
 * /student:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Student]
 *     parameters:
 *       - in: query
 *         name: offset         
 *         description: The number of items to skip before starting to collect the result set.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: The numbers of items to return.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: column
 *         description: Column to order
 *         required: true
 *         schema:
 *           type: string
 *           enum: [id, fio, birthday, grade]
 *       - in: query
 *         name: orderBy
 *         description: Type of order
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       "200":
 *          description: The list of studentds.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SuccessResponseArray'
 *       "400":
 *          description: Error response single.
 *          content:
 *            application/json:
 *              schema:  
 *                oneOf:  
 *                  - $ref: '#/components/schemas/ErrorResponse'   
 *                  - $ref: '#/components/schemas/ErrorResponseArray'   
 *                  
*/          
router.get('/',studentColumnValidation,StudentController.getStudents)

// ADD STUDENT
/** 
* @swagger
* /student:
*   post:
*     summary: Creates a new student
*     tags: [Student]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Student'
*     responses:
*       "200":
*          description: The created student.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Student'
*       "400":
*          description: Error response single.
*          content:
*            application/json:
*              schema:  
*                oneOf:  
*                  - $ref: '#/components/schemas/ErrorResponse'   
*                  - $ref: '#/components/schemas/ErrorResponseArray'   
*/
router.post('/',studentValidation, StudentController.postStudent);

// GET STUDENTS BY ID
/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Retrieve a student by id
 *     tags: [Student]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: integer
 *          required: true
 *     responses:
 *       "200":
 *          description: Get a student by id.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: The response status
 *                    example: true
 *                  body:
 *                    $ref: '#/components/schemas/Student'
 *       "400":
 *          description: Error response single.
 *          content:
 *            application/json:
 *              schema:  
 *                oneOf:  
 *                  - $ref: '#/components/schemas/ErrorResponse'   
 *                  - $ref: '#/components/schemas/ErrorResponseArray'          
*/
router.get('/:id',idValidation, StudentController.getOneStudent)

// UPDATE STUDENTS BY ID
/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update a student by id
 *     tags: [Student]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: integer
 *          required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       "200":
 *          description: Update a student by id.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: The response status
 *                    example: true
 *                  body:
 *                    $ref: '#/components/schemas/Student'
 *       "400":
 *          description: Error response single.
 *          content:
 *            application/json:
 *              schema:  
 *                oneOf:  
 *                  - $ref: '#/components/schemas/ErrorResponse'   
 *                  - $ref: '#/components/schemas/ErrorResponseArray'   
 * 
*/
router.put('/:id', [...idValidation, ...studentValidation],StudentController.updateStudent)



// DELETE STUDENT BY ID
/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: delete a student by id
 *     tags: [Student]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: integer
 *          required: true
 *     responses:
 *       "200":
 *          description: Delete a student by id.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: The response status
 *                    example: true
 *                  body:
 *                    type: string
 *                    description: Message of operation
 *                    example: Student deleted successfully
 *       "400":
 *          description: Error response single.
 *          content:
 *            application/json:
 *              schema:  
 *                oneOf:  
 *                  - $ref: '#/components/schemas/ErrorResponse'   
 *                  - $ref: '#/components/schemas/ErrorResponseArray'      
*/
router.delete('/:id',idValidation, StudentController.deleteStudent)

export default router