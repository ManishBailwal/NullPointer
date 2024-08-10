import React, { useState, useEffect } from "react";
import styles from "./compiler.module.css";
import { useParams } from "react-router-dom";
import { problems } from "../../constants/problems";
import Editor from "@monaco-editor/react";
import { languageTemplates } from "../../constants/languages";
import axios from "axios";

function Compiler() {
  const [currprob, setcurrprob] = useState({
    question: "",
    description: "",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [executed, setExecuted] = useState(false);
  const [code, setCode] = useState(languageTemplates["java"].hello_world);
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
      passed: false,
      currentOutput: "N/A",
    },
  ]);

  const [allTestCases, setAllTestCases] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (problems[id]) {
      setcurrprob(problems[id]);
      setTestCases([problems[id]?.inputTestCases[0]]);
      setAllTestCases(
        problems[id]?.inputTestCases.map((testCase) => ({
          input: testCase.input,
          output: testCase.output,
          passed: false,
          currentOutput: "N/A",
        }))
      );
    }
  }, [id]);

  useEffect(() => {
    setCode(languageTemplates[selectedLanguage].hello_world);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    try {
      setOutput("EXECUTING...");
      setExecuted(true);
      const response = await axios.post("http://localhost:5001/compile", {
        code: code,
        language: selectedLanguage,
        input: testCases[0].input,
      });
      console.log(response.data.output, testCases[0].output);
      const test = "asfd";
      test.trim();

      setTestCases((prevState) => {
        return prevState.map((testCase) => {
          return {
            ...testCase,
            currentOutput: response.data.output,
            passed:
              response.data.output.toString().trim() ===
              testCase.output.toString().trim(),
          };
        });
      });
      setOutput("EXECUTED");
    } catch (error) {
      console.log(error);
      setExecuted(false);
      setOutput(error?.response?.data?.error);
    }
  };

  console.log(currprob);

  const handleRunSubmit = async () => {
    try {
      setExecuted(true);
      setOutput("EXECUTING...");
      const updatedTestCases = await Promise.all(
        allTestCases.map(async (testCase) => {
          const response = await axios.post("http://localhost:5001/compile", {
            code: code,
            language: selectedLanguage,
            input: testCase.input,
          });

          console.log(testCase.input, testCase.output);

          // Check if the output matches the expected output
          const passed =
            response.data.output.toString().trim() ===
            testCase.output.toString().trim();

          return {
            ...testCase,
            currentOutput: response.data.output,
            passed: passed,
          };
        })
      );

      // Update the state with the results for all test cases
      setTestCases(updatedTestCases);
      setOutput("EXECUTED");
    } catch (error) {
      console.log(error);
      setExecuted(false);
      setOutput(error?.response?.data?.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.heading}>{currprob?.name}</div>

        <div>{currprob?.questions}</div>
        <hr></hr>

        <div>{currprob?.description}</div>
        <hr></hr>

        <div>
          {currprob?.inputTestCases?.map((testCase, index) => (
            <div key={index}>
              <div className={styles.input}>{testCase.input}</div>
              <div className={styles.input}>{testCase.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.second} bg-white rounded-md text-black flex flex-col gap-4`}
      >
        <div className="bg-white rounded-md p-2 text-black flex gap-4">
          Language:
          <select onChange={(e) => setSelectedLanguage(e.target.value)}>
            {/* <option value="c">C</option> */}
            {/* <option value="cpp">C++</option> */}
            <option value="java">Java</option>
            {/* <option value="python">Python</option> */}
          </select>
          <button
            className="bg-green-600 w-24 p-2 text-white rounded-sm"
            onClick={handleRunCode}
          >
            Run
          </button>
          <button
            className="bg-green-600 w-24 p-2 text-white rounded-sm"
            onClick={handleRunSubmit}
          >
            Submit
          </button>
        </div>

        <Editor
          height="50vh"
          language={selectedLanguage}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />

        <div className="bg-black text-green-500 p-4 flex-1">
          {" "}
          <pre>{output}</pre>
          {executed && (
            <div className="grid grid-cols-4 gap-4">
              <div>Input</div>
              <div>Output</div>
              <div>Expected</div>
              <div>RESULT</div>
            </div>
          )}
          {executed &&
            testCases.map((testCase, index) => (
              <div key={index} className="grid grid-cols-4 gap-4">
                <div className={styles.input}>{testCase.input}</div>
                <div className={styles.input}>{testCase.currentOutput}</div>
                <div className={styles.input}>{testCase.output}</div>
                <div className={styles.input}>
                  {testCase.passed ? "PASS" : "FAIL"}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Compiler;
