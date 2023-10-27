import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getOneTask } from "../features/tasks/taskSlice";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
// }

const TaskDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { taskById } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const deleteTaskbyId = () => {
    dispatch(deleteTask(id));
    navigate("/");
  };

  const fetchTask = async () => {
    dispatch(getOneTask(id));
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <div>
      <h3 className="mb-5">Task Details</h3>
      {taskById ? (
        <div className="d-flex justify-content-between w-75 m-auto">
          <div>
            <h3>{taskById.title}</h3>
            <h6>{taskById.description}</h6>
          </div>

          <div className="">
            <button
              className="btn btn-success"
              onClick={() => navigate(`/editTask/${taskById.id}`)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={deleteTaskbyId}>
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
