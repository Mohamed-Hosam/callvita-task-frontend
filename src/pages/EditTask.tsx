import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/task/${id}`);
      console.log(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/task/${id}`, {
        title,
        description,
      });
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
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
