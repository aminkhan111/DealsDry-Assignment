const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const EmployeeRouter = require('./Routes/EmployeeRoutes');

require('./Models/dbAuth');        // Connection for Auth and Products
require('./Models/dbEmployee');    // Connection for Employee Management

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Route handlers
app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.get('/', (req, res) => {
    res.send('Employee Mgm Server is running');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api/employees', EmployeeRouter);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
