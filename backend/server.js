const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs'); // Required for file operations

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());



app.post('/compile', (req, res) => {
  const { code, language } = req.body;

  let command = '';

  

//   if (language === 'python') {
//     command = python -c `"${code}"`;
//   }
//    else if (language === 'javascript') {
//     command = node -e `"${code}"`;
//   } 
//   else
   if (language === 'java') {
    fs.writeFileSync('Main.java', code);
    command = 'javac Main.java && java Main';
  } 
  else if (language === 'cpp') {
    fs.writeFileSync('main.cpp', code);
    command = 'gcc main.cpp -o main && ./main';
  } else {
    return res.status(400).send('Unsupported language');
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
});


app.get('/', (req,res)=>{
   return res.send("hello ")
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});