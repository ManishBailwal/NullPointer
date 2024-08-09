
import './App.css';

import Home from './pages/Home';
import Problems from './pages/Problems';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems/:id" element={<Problems/>} />

      
      
    </Routes>
  </Router>
      
   
  );
}

export default App;
