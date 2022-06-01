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
const {generateFile} = require('./generateFile');
const { executeCpp } = require('./executeCpp');

require("dotenv").config();

// middleware
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);
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


//compiler implementation
app.get("/", (req,res) => {
  return res.json({hello: "world"});
});


app.post("/api/run", async (req,res) => {

  const {language = "cpp", code} = req.body;

  if(code=== undefined){
    return res.status(400).json({ success: false, error: "Empty code body"});
  }

  // need to generate a c++ file with content from the request
 
  try {
    const filepath = await generateFile(language,code);
    const output = await executeCpp(filepath);
    return res.json({filepath,output})
  } catch (error) {
    console.log(error);
  }
  
  //and run the file and send the response

  
});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));