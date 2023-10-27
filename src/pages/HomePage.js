import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks, searchTasks } from "../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
// }

const HomePage = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { allTasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const navigate = useNavigate();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Tasks</h1>

      <div className="d-flex form-group mb-5  mt-5 gap-3 w-50 m-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dispatch(searchTasks(search))}
        >
          Search
        </button>
      </div>

      <div className="w-50 m-auto d-flex flex-column gap-3">
        {allTasks.map((task) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/task/getTaskbyId/${task.id}`)}
            key={task.id}
            className="border border-primary cursor-pointer"
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/createTask")}
      >
        Create Task
      </button>
    </div>
  );
};

export default HomePage;
