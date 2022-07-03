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
const { executePy } = require('./executePy');
const assignmentDeleteRoute = require('./routes/assignmentDelete');
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

require("dotenv").config();

var compiler = require('compilex');
var options = {stats : true};
compiler.init(options);


// const PythonShell = require("python-shell").PythonShell;


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
app.use('/teacher/api/assignment/delete', assignmentDeleteRoute);


// app.post("/assignment/run", async(req,res) => {
//     const {language, code} = req.body;
//     if(language === "cpp")
//     {        
//         var envData = { OS : "windows" , cmd : "g++", options: {timeout:1000 }};
//         compiler.compileCPP(envData , code , function (data) {
          
//           try {
//                 res.send(data);
//               } catch (error) {
//                 res.status(500).json({errorMessage: data.error});
//               }
              
//         });
// 	  }
//     if(language ==="py") 
//     {

//     }


//     compiler.flushSync();
// });

// app.get('/fullStat' , function(req , res ){
//   compiler.fullStat(function(data){
//       res.send(data);
//   });
// });
// compiler.flushSync(function () {
//   console.log("Temp files flushed.")
// })

// //compiler implementation
app.get("/", (req,res) => {
  return res.json({hello: "world"});
});


app.post("/assignment/run/:assignmentId", async (req,res)=> {

    const {language, code} = req.body;
    const assignmentId = req.params.assignmentId;

    if(language == "cpp") {
        if(code=== undefined){
          return res.status(400).json({ success: false, error: "Empty code body"});
        }

      
        try {
          // need to generate a c++ file with content from the request
          const filepath = await generateFile(language,code);
      
          //and run the file and send the response
          const output = await executeCpp(filepath);
          return res.json({successMessage:'Compiled Successfully!',filepath,output})
        } catch (error) {
          console.log(error);
          res.status(500).json({errorMessage: 'Compiled with errors.'});
        }
    }


    if(language =="py") 
    {

      if(code=== undefined){
        return res.status(400).json({ success: false, error: "Empty code body"});
      }
       
          const pythonCodes = path.join(__dirname,"assignmentCodes",`${assignmentId}`);

          if(!fs.existsSync(pythonCodes)){
              fs.mkdirSync(pythonCodes,{recursive:true});
          }
          const filepath = path.join(pythonCodes,"input_code.py");
          const filepathTest = path.join(pythonCodes,"tests.py");
          fs.writeFileSync(filepath, code);
          try{
            const output = executePy(filepathTest);
            // return res.send(data);
            return res.json({successMessage:'Compiled Successfully!',output})
          }catch(error) {
           res.status(500).json({errorMessage: 'Compiled with errors.'});
          }
    
    }
  

});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

