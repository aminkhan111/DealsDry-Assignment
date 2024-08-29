const routes = require('express').Router();
const { createEmployee, getAllEmployees,getEmployeebyId ,deleteEmployeebyId, updateEmployeeById   } = require('../Controllers/EmployeeController');

const { cloudinaryFileUploader } = require('../Middlewares/FileUplaoder');

routes.get('/', getAllEmployees);

routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

routes.get('/:id', getEmployeebyId);
routes.delete('/:id', deleteEmployeebyId);

module.exports = routes;
