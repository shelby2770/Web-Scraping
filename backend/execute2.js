const { exec } = require('child_process');

const s= "Samsung"
const command= `cd .. && cd gadgetNgadget && scrapy crawl spider1 -a my_argument=${s}`
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    // return;
  }
  console.log(`stdout: ${stdout}`);
});