import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
}

const HomePage = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/task");
      console.log(response.data);
      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchTask = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/task/search/${search}`);
      console.log(response.data);
      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Tasks</h1>

      <form onSubmit={searchTask}>
        <div className="d-flex form-group mb-5  mt-5 gap-3 w-50 m-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className="w-50 m-auto d-flex flex-column gap-3">
        {allTasks.map((task: any) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/task/${task.id}`)}
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
