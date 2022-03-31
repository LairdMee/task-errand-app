import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import Tasks from "./routes/Tasks";
import createTask from "./routes/CreateTask";
import editTask from "./routes/EditTask";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div style={{ padding: "0 60px" }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/create" element={<createTask />} />
          <Route path="/edit/:invoiceId" element={<editTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
