import React, { useState } from 'react'
import styles from './compiler.module.css'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { problems } from '../../constants/problems';

function Compiler() {

  const [currprob, setcurrprob] = useState({

    question: "",
    description: "",
  })

  const { id } = useParams();

  useEffect(() => {

    if(problems[id]){

      setcurrprob(problems[id])

    }
    
  
   
  }, [])
  console.log(currprob)
  


  return (
    <div className={styles.container}>

        <div className={styles.first}>

          <div className={styles.heading}>{currprob?.name}</div>

          <div>
          {currprob?.questions}
          </div>
          <hr></hr>

             <div>{currprob?.description}</div>
             <hr></hr>
             
             <div >
        {currprob?.inputTestCases?.map((testCase, index) => (
          <div key={index}>
            <div className={styles.input}>  {testCase.input}</div>
              <div className={styles.input}> {testCase.output}</div>
          </div>
        ))}
      </div>
             
             
        </div>
        <div className={styles.second}></div>




        </div>
  )
}

export default Compiler