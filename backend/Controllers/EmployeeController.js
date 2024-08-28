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
        if (err.name === 'ValidationError') {
            return res.status(400).json({
              message: 'Validation Error',
              success: false,
              errors: err.errors,
        });
    }
     // Handle other errors
     res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err.message,
    });
}
}
const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileno,designation, gender, course, createdate } = req.body;
        
        let updateData = {
            name,email,mobileno,designation,gender,course, createdate
        }

        if(req.file){
            updateData.profileImage = req.file.path;
        }
 
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updateEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200)
            .json({
                message: 'Employee Updated',
                success: true,
                data: updateEmployee
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

 // Get page and limit from query parameters
 let { page, limit, search } = req.query;

 // Set default values if they are not provided
 page = parseInt(page) || 1;
 limit = parseInt(limit) || 10;

 // Calculate the number of documents to skip
 const skip = (page - 1) * limit;




        // Build the search criteria
         
        let searchCriteria = {};

 
 if (search) {
     searchCriteria = {
         name: {
             $regex: search,
             $options: 'i' // case insensitive
         }
     }
 }
 

 
        
  // Get the total number of employees for pagination info
  const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

  // Fetch the employees with pagination
  const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ createdate: -1 });

  // Calculate total pages
  const totalPages = Math.ceil(totalEmployees / limit);
      
  res.status(200)
  .json({
      message: 'All Employees',
      success: true,
      data: {
          employees: emps,
          pagination: {
              totalEmployees,
              currentPage: page,
              totalPages,
              pageSize: limit
          }
      }
  });
} catch (err) {
console.log(err);
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
    deleteEmployeebyId,
    updateEmployeeById
}
