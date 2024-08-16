const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req?.file ? req?.file?.path : null;

console.log(body);

        body.profileImage = profileImage;
        const emp = new EmployeeModel(body);

        await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const emps = await EmployeeModel.find ({});
        res.status(200)
            .json({
                message: 'All Employees',
                success: true,
                data: emps 
                
            })
    } catch (err) {
         
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const getEmployeebyId = async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModel.findOne({ _id: id });

        res.status(200)
            .json({
                message: 'Get Employees Details',
                success: true,
                data: emp 
                
            })
    } catch (err) {
         
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const deleteEmployeebyId = async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModel.findOneAndDelete({ _id: id });

        res.status(200)
            .json({
                message: 'Employee Deleted',
                success: true,
                  
            })
    } catch (err) {
         
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};


module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeebyId,
    deleteEmployeebyId
}