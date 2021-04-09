import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express'
import * as cors from 'cors'
import allRoutes from './routes';
import * as dotenv from 'dotenv'
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJSDocs from 'swagger-jsdoc';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';

const log = fs.createWriteStream(
  path.join(__dirname, "logs", "express.log"), { flags: "a" }
);

dotenv.config()
  
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "Student REST api",
          version: "0.0.1",
          description:
            "This is a simple CRUD API application for students made with Express and documented with Swagger, TypeORM with Postgres",
        },
        servers: [
          {
            url: "http://localhost:8000/api/v1",
          },
        ],
      },
    apis: ['./src/routes/routes*.ts'],
  };
  
const swaggerSpec = swaggerJSDocs(options);


createConnection()
.then(async (connection) => {

    const app = express()

  
    app.use(cors())
    app.use(express.urlencoded({
        extended: true,
      }));
    app.use(express.json());
    
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // setup the logger
    app.use(morgan('combined', { stream: log }))
    app.use(morgan('dev'));
    
    allRoutes(app);
    const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>  console.log(`App is running at port ${PORT}`))

}).catch(error => console.log(error));
