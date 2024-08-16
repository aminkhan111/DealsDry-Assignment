const routes = require('express').Router();

const { createEmployee , getAllEmployees, getEmployeebyId , deleteEmployeebyId, updateEmployeeById  } = require('../Controllers/EmployeeController');

const { cloudinaryFileUploader } = require('../Middlewares/FileUplaoder');

routes.get('/', getAllEmployees);


routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);

routes.get('/:id', getEmployeebyId);

routes.delete('/:id', deleteEmployeebyId);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

module.exports = routes;