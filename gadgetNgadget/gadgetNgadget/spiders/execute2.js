const { exec } = require('child_process');

const s= "pixel 7"
const command= `python spider.py ${s}`
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    // console.error(`stderr: ${stderr}`);
    // return;
  }
  console.log(`stdout: ${stdout}`);
});