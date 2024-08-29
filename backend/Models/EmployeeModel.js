const employeeConnection = require('./dbEmployee');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    mobileno: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: new Date()
    },
    profileImage: { 
        type: String 
    },
});

const EmployeeModel = employeeConnection.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
