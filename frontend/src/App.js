import "./App.css";

import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Playground from "./pages/playground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadProblem from "./pages/uploadProblem";
import Contest from "./pages/contest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems/:id" element={<Problems />} />
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/uploadproblem" element={<UploadProblem/>}/>
        <Route path="/contest" element={<Contest/>}/>

        
      </Routes>
    </Router>
  );
}

export default App;
