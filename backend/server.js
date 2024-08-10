const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

app.post("/compile", async (req, res) => {
  const { code, language, input } = req.body;

  if (language === "java") {
    // Write Java code to Main.java
    fs.writeFileSync("Main.java", code);

    // Generate a unique filename for input
    const inputFileName = `input_${Date.now()}.txt`;

    // Write input to the unique input file
    fs.writeFileSync(inputFileName, input);

    // Compile and execute the Java program, passing the unique input file as stdin
    exec(
      `javac Main.java && java Main < ${inputFileName}`,
      (error, stdout, stderr) => {
        // Delete the input file after execution
        fs.unlinkSync(inputFileName);

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        if (stderr) {
          return res.status(500).json({ error: stderr });
        }
        return res.json({ output: stdout });
      }
    );
  } else if (language === "cpp") {
    fs.writeFileSync("main.cpp", code);
    exec(`gcc main.cpp -o main && ./main`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        return res.status(500).json({ error: stderr });
      }
      return res.json({ output: stdout });
    });
  } else {
    return res.status(400).send("Unsupported language");
  }
});

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
