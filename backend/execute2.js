const { exec } = require('child_process');

const s= "Iphone"
const command= `cd .. && cd gadgetNgadget && python spider.py ${s}`
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    // console.error(`stderr: ${stderr}`);
    // return;
  }
  const get_data= JSON.parse(stdout)
  for (let i=0; i<get_data.length; ++i){
    console.log(get_data[i]["price"])
  }
  // console.log(`stdout: ${stdout}`);
});