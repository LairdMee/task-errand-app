import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const params = useParams();
  // Step 1: create an empty state for the data
  const [tasks, settasks] = useState([]);

  // Step 2: fetch the data from the server once the component mounted
  const fetchtasks = async () => {
    try {
      const res = await fetch("http://localhost:3001/tasks");
      const data = await res.json();
      settasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  // const tasks = gettasks();
  const removetask = async (e, id) => {
    e.stopPropagation();
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    const tasksAfter = tasks.filter((task) => task.id !== id);
    settasks(tasksAfter);
    console.log(params);
    if (id === parseInt(params.taskId, 10)) {
      navigate("/");
    }
  };

  const goToEditRoute = (e, id) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Text</th>
            <th style={{ textAlign: "left" }}>Time</th>
            <th style={{ textAlign: "left" }}>Day</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <td>{task.text}</td>
                <td>{task.time}</td>
                <td>{task.day}</td>
                <td>
                  <button onClick={(e) => removetask(e, task.id)}>
                    Remove
                  </button>
                  <button onClick={(e) => goToEditRoute(e, task.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button style={{ marginTop: "20px" }} onClick={() => navigate("/create")}>
        Create New task
      </button>
      <Outlet />
    </>
  );
};

export default Tasks;
