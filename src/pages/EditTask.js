import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/task/getTaskbyId/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const editTask = async (e) => {
    e.preventDefault();
    console.log(id);
    dispatch(
      updateTask({
        id,
        title,
        description,
      })
    );
    navigate("/");
  };

  return (
    <div>
      <h3>Edit Task</h3>
      <div className="w-25 m-auto mt-5">
        <form onSubmit={editTask}>
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

export default EditTask;
