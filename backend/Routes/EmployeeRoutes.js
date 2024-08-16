const routes = require('express').Router();

const { createEmployee , getAllEmployees,   } = require('../Controllers/EmployeeController');

const { cloudinaryFileUploader } = require('../Middlewares/FileUplaoder');

routes.get('/', getAllEmployees);


routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);



module.exports = routes;