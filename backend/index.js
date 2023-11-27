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
  let returned_val= []
  const s = req.body.inputValue;
  const command =
    `cd .. && cd gadgetNgadget && scrapy crawl spider1 -a my_argument=${s}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      // return;
    }
    // console.log(`stdout: ${stdout}`);
    const obj= {stdout}
    res.send(obj)
  });
  // const obj= {command}
  // res.send(obj);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// app.get("/devices", (req, res) => {
//   res.send(users);
// });
