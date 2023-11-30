const { exec } = require('child_process');

const s= "pixel 7"
// const command= `cd .. && cd kry && scrapy crawl kryspider -a my_argument=${s}`
const command= "python kryspider.py"
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
  // console.log(typeof stdout)

  // console.log(typeof x[1]["price"][0])
});