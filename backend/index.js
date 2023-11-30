const express = require("express");
const cors = require("cors");
const app = express();
const { exec } = require("child_process");

//middlewares
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Everything is ok...");
});

app.post("/devices", (req, res) => {
  console.log("api is hitting");
  let returned_val = [];
  const s = req.body.inputValue;
  const command = `cd .. && cd gadgetNgadget && python spider.py ${s}`
  let obj= {};
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
     // obj = { get_data };
    // console.log(`stdout: ${stdout}`);
  res.send(get_data);
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});