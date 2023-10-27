import { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import CreateTask from "./pages/CreateTask.tsx";
import EditTask from "./pages/EditTask.tsx";
import TaskDetails from "./pages/TaskDetailsPage.tsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/editTask/:id" element={<EditTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
      {/* <h1>HomePage</h1> */}
    </div>
  );
}

export default App;
