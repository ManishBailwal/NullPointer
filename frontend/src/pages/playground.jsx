import React, { useState, useEffect, useCallback } from "react";
import styles from "./playground.module.css";
import Editor from "@monaco-editor/react";
import { languageTemplates } from "../constants/languages";
import axios from "axios";
import Header from "../components/header/header";

function Playground() {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [executed, setExecuted] = useState(false);
  const [code, setCode] = useState(languageTemplates["java"].hello_world);
  const [output, setOutput] = useState("");
  const [inputFields, setInputFields] = useState([]); // State for dynamic input fields
  const [inputs, setInputs] = useState({}); // State for storing input values
  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
      passed: false,
      currentOutput: "N/A",
    },
  ]);

  useEffect(() => {
    setCode(languageTemplates[selectedLanguage].hello_world);
    
    if (selectedLanguage === "java") {
      setInputFields([{ id: 1, placeholder: "Enter input for Java program" }]);
    } else if (selectedLanguage === "python") {
      setInputFields([{ id: 1, placeholder: "Enter input for Python program" }]);
    }
  }, [selectedLanguage]);

  const handleRunCode = useCallback(async () => {
    try {
      setOutput("EXECUTING...");
      setExecuted(true);

      // Reset previous output and test case results
      setTestCases((prevState) => {
        return prevState.map((testCase) => ({
          ...testCase,
          currentOutput: "N/A", // Reset current output
          passed: false, // Reset pass status
        }));
      });

      const response = await axios.post("http://localhost:5001/compile", {
        code: code,
        language: selectedLanguage,
        input: inputs[1] || "", // Adjust based on your input handling logic
      });

      // Update the test cases with the new output
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
      setOutput(error?.response?.data?.error || "Error executing code");
    }
  }, [code, inputs, selectedLanguage]);

  return (
    <div>
      <Header />
      <div className={`${styles.second} bg-white rounded-md text-black flex flex-col gap-4`}>
        <div className="bg-white rounded-md p-2 text-black flex gap-4">
          Language:
          <select onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="java">Java</option>
            <option value="python">Python</option>
            {/* Add more languages as needed */}
          </select>
          <button
            className="bg-green-600 w-24 p-2 text-white rounded-sm"
            onClick={handleRunCode}
          >
            Run
          </button>
        </div>

        <Editor
          height="50vh"
          language={selectedLanguage}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />

        <div className="bg-white p-4">
          {inputFields.map((field) => (
            <textarea
              key={field.id}
              className="w-full p-2 border rounded mb-2"
              placeholder={field.placeholder}
              value={inputs[field.id] || ""}
              onChange={(e) => setInputs({ ...inputs, [field.id]: e.target.value })}
            />
          ))}
        </div>

        <div className="bg-black text-green-500 p-4 flex-1">
          <p>{output}</p>
          {executed && (
            <div className="grid grid-cols-4 gap-4">
              <div>Output</div>
              <div>RESULT</div>
            </div>
          )}
          {executed &&
            testCases.map((testCase, index) => (
              <div key={index} className="grid grid-cols-4 gap-4">
                <div className={styles.input}>{testCase.input}</div>
                <pre className={styles.input}>{testCase.currentOutput}</pre>
                <div className={styles.input}>{testCase.output}</div>
                {/* <div className={styles.input}>
                  {testCase.passed ? "PASS" : "FAIL"}
                </div> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Playground;
