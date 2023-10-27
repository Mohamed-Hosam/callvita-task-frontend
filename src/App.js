import "./App.css";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetailsPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createTask" element={<CreateTaskPage />} />
          <Route path="/editTask/:id" element={<EditTask />} />
          <Route path="/task/getTaskbyId/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
