import React from 'react'
import styles from './problembox.module.css'
import { problems } from '../../constants/problems';
import { Link } from 'react-router-dom';


function Problembox() {
  return (
    <div className={styles.container}>

{Object.keys(problems).map((key) => {
        const problem = problems[key];
        return (
          <div key={problem.id} className={styles.scontainer}>
            <p>{problem.id}</p>
            <h2 className={styles.qname}>
              <Link to={`/problems/${key}`}>{key.replace(/_/g, " ")}</Link>
            </h2>
            <p className={styles.difficulty}>{problem?.difficulty}</p>
            <p>{problem?.status}</p>
          </div>
        );
      })}

     


     

      
      </div>
  )
}

export default Problembox;