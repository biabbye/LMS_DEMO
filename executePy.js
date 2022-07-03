const execSync = require('child_process').execSync;
const path = require('path');

const executePy = (filepathTest) =>{
    

    const output = execSync("python " + filepathTest).toString();
    return output;
}

module.exports = {
    executePy
}