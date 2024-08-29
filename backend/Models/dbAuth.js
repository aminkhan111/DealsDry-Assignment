// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;
// mongoose.connect(mongo_url)
//     .then(() => {
//         console.log('MongoDB Connected...');
//     }).catch((err) => {
//         console.log('MongoDB Connection Error: ', err);
//     })


const mongoose = require('mongoose');

// Create a new Mongoose instance for the auth and products database
const authConnection = mongoose.createConnection(process.env.MONGO_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authConnection.on('connected', () => {
  console.log('Connected to Auth and Products DB');
});

authConnection.on('error', (err) => {
  console.error('Failed to connect to Auth and Products DB', err);
});

module.exports = authConnection;
