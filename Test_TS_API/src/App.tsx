import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trash from "./wadah/Trash";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
