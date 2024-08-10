const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

app.post("/compile", async (req, res) => {
  const { code, language, input } = req.body;
  const EXECUTION_TIMEOUT = 3000; // 3 seconds timeout

  if (language === "java") {
    // Write Java code to Main.java
    fs.writeFileSync("Main.java", code);

    // Generate a unique filename for input
    const inputFileName = `input_${Date.now()}.txt`;

    // Write input to the unique input file
    fs.writeFileSync(inputFileName, input);

    // Compile Java code
    const compile = spawn("javac", ["Main.java"]);

    compile.on("close", (code) => {
      if (code !== 0) {
        // Compilation failed
        fs.unlinkSync(inputFileName);
        return res.status(500).json({ error: "Compilation failed" });
      }

      // Execute Java code
      const javaProcess = spawn("java", ["Main"], {
        stdio: ["pipe", "pipe", "pipe"]
      });

      // Pass input to the process
      javaProcess.stdin.write(input);
      javaProcess.stdin.end();

      let output = "";
      let errorOutput = "";

      // Collect the output from the process
      javaProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      javaProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      // Implement timeout logic
      const timeout = setTimeout(() => {
        javaProcess.kill();
        fs.unlinkSync(inputFileName);
        return res.status(500).json({ error: "Execution timed out" });
      }, EXECUTION_TIMEOUT);

      javaProcess.on("close", (code) => {
        clearTimeout(timeout);
        fs.unlinkSync(inputFileName);
        if (code !== 0) {
          return res.status(500).json({ error: errorOutput || "Execution failed" });
        }
        return res.json({ output: output.trim() });
      });
    });
  } else if (language === "cpp") {
    fs.writeFileSync("main.cpp", code);
    
    // Compile C++ code
    const compile = spawn("g++", ["main.cpp", "-o", "main"]);

    compile.on("close", (code) => {
      if (code !== 0) {
        // Compilation failed
        return res.status(500).json({ error: "Compilation failed" });
      }

      // Execute C++ code
      const cppProcess = spawn("./main", {
        stdio: ["pipe", "pipe", "pipe"]
      });

      // Pass input to the process
      cppProcess.stdin.write(input);
      cppProcess.stdin.end();

      let output = "";
      let errorOutput = "";

      // Collect the output from the process
      cppProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      cppProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      // Implement timeout logic
      const timeout = setTimeout(() => {
        cppProcess.kill();
        return res.status(500).json({ error: "Execution timed out" });
      }, EXECUTION_TIMEOUT);

      cppProcess.on("close", (code) => {
        clearTimeout(timeout);
        if (code !== 0) {
          return res.status(500).json({ error: errorOutput || "Execution failed" });
        }
        return res.json({ output: output.trim() });
      });
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
