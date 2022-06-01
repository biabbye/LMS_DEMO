const { exec} = require("child_process");
const fs = require('fs');
const path = require('path');


const outputPath = path.join(__dirname,"outputs");


if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp = (filepath) => {

    const jobId = path.basename(filepath).replace().split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const promise = new Promise(function (resolve,reject) {
        
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\${jobId}.exe`, (error,stdout,stderr) => {
            if(error){
                reject({error,stderr});
            }
            if(stderr) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });

    return promise;
}

module.exports= {
    executeCpp
}