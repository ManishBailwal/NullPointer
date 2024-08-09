import React, { useState } from "react";
import styles from "./compiler.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { problems } from "../../constants/problems";
import Editor from "@monaco-editor/react";
import { languageTemplates } from "../../constants/languages";
function Compiler() {
  const [currprob, setcurrprob] = useState({
    question: "",
    description: "",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState(languageTemplates["c"].hello_world);

  const { id } = useParams();

  useEffect(() => {
    if (problems[id]) {
      setcurrprob(problems[id]);
    }
  }, []);

  useEffect(() => {
    setCode(languageTemplates[selectedLanguage].hello_world);
  }, [selectedLanguage]);

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
              <div className={styles.input}> {testCase.input}</div>
              <div className={styles.input}> {testCase.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.second} bg-white rounded-md  text-black flex flex-col gap-4`}
      >
        <div className="bg-white rounded-md p-2 text-black flex gap-4">
          Language:
          <select onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <Editor height="500px" language={selectedLanguage} value={code} />
        <div className="bg-black text-green-500 p-4 flex-1">OUTPUT</div>
      </div>
    </div>
  );
}

export default Compiler;
