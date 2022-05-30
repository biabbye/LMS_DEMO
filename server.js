const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./Database/DBConnection');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');
const assignmentRoutes = require('./routes/assignment');

require("dotenv").config();

// middleware
// app.use(                //this mean we don't need to use body-parser anymore
//   express.urlencoded({
//     extended: true,
//   })
// );
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended:false
}));
// app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/group',groupRoutes);
app.use('/api/assignment', assignmentRoutes);

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));