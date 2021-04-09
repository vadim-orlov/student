import studentRouter from './routesStudent';

const versionNumber = '/api/v1';


export default (app) => {
    app.use(versionNumber+'/student', studentRouter);
  };