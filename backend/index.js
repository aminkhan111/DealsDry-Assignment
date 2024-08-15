const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
 
const PORT = process.env.PORT || 8080;

require('./Models/db');




app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});