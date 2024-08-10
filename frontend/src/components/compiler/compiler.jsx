import React, { useState, useEffect } from "react";
import styles from "./compiler.module.css";
import { useParams } from "react-router-dom";
import { problems } from "../../constants/problems";
import Editor from "@monaco-editor/react";
import { languageTemplates } from "../../constants/languages";
import axios from 'axios';

function Compiler() {
  const [currprob, setcurrprob] = useState({
    question: "",
    description: "",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState(languageTemplates["c"].hello_world);
  const [output, setOutput] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (problems[id]) {
      setcurrprob(problems[id]);
    }
  }, [id]);

  useEffect(() => {
    setCode(languageTemplates[selectedLanguage].hello_world);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/compile', {
        code: code,
        language: selectedLanguage,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error executing code');
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

      <div className={`${styles.second} bg-white rounded-md text-black flex flex-col gap-4`}>
        <div className="bg-white rounded-md p-2 text-black flex gap-4">
          Language:
          <select onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
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

        <div className="bg-black text-green-500 p-4 flex-1"> <pre>{output}</pre></div>
      </div>
    </div>
  );
}

export default Compiler;
