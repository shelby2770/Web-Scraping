const express = require("express");
const cors = require("cors");
const app = express();
const { exec } = require("child_process");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Everything is ok...");
});

app.post("/devices", (req, res) => {
  console.log("api is hitting");
  const s = req.body.inputValue;
  const command = `python spider.py ${s}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      // console.error(`stderr: ${stderr}`);
      // return;
    }
    const get_data = JSON.parse(stdout);
    res.send(get_data);
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
