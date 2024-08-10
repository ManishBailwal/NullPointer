import "./App.css";

import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Playground from "./pages/playground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadProblem from "./pages/uploadProblem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems/:id" element={<Problems />} />
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/uploadproblem" element={<UploadProblem/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
