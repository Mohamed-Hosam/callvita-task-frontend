import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState<Task>();

  const deleteTask = async () => {
    try {
      const response = await axios.delete(`/api/task/${id}`);
      console.log(response.data);
      setTask(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/task/${id}`);
      console.log(response.data);
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <div>
      <h3 className="mb-5">Task Details</h3>
      {task ? ( 
        <div className="d-flex justify-content-between w-75 m-auto">
          <div>
            <h3>{task.title}</h3>
            <h6>{task.description}</h6>
          </div>

          <div className="">
            <button className="btn btn-success" onClick={() => navigate(`/editTask/${task.id}`)} >Edit</button>
            <button className="btn btn-danger" onClick={deleteTask}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default TaskDetailsPage;
