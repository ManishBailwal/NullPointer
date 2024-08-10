import React from "react";
import styles from "./problembox.module.css";
import { problems } from "../../constants/problems";
import { Link } from "react-router-dom";

function Problembox() {
  return (
    <div className={`${styles.container} `}>
      {Object.keys(problems).map((key) => {
        const problem = problems[key];
        return (
          <Link to={`/problems/${key}`}>
            <div
              key={problem.id}
              className={`${styles.scontainer} hover:opacity-75 hover:bg-purple-400`}
            >
              <p>{problem.id}</p>
              <h2 className={styles.qname}>
                <p>{key.replace(/_/g, " ")}</p>
              </h2>
              <p className={styles.difficulty}>{problem?.difficulty}</p>
              <p>{problem?.status}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Problembox;
