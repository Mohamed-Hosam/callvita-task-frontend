import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createNewTask = async (e) => {
    e.preventDefault();
    dispatch(
      createTask({
        title,
        description,
      })
    );
    navigate("/");
  };

  return (
    <div>
      <h3>Create Task</h3>
      <div className="w-25 m-auto mt-5">
        <form onSubmit={createNewTask}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
