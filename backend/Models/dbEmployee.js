
const mongoose = require('mongoose');

// Create a new Mongoose instance for the employee management database
const employeeConnection = mongoose.createConnection(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

employeeConnection.on('connected', () => {
  console.log('Connected to Employee Management DB');
});

employeeConnection.on('error', (err) => {
  console.error('Failed to connect to Employee Management DB', err);
});

module.exports = employeeConnection;
