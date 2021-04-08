import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express'
import * as BodyParser from 'body-parser'
import * as cors from 'cors'
import studentRoutes from './routes/studentRoutes';
import * as dotenv from 'dotenv'
import { body, validationResult } from 'express-validator';
dotenv.config()


createConnection()
.then(async (connection) => {

    const app = express()
    app.use(cors())
    app.use(BodyParser.json());
 

    app.use('/', studentRoutes)
    const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>  console.log(`App is running at port ${PORT}`))

}).catch(error => console.log(error));
