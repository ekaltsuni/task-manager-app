import React from "react";
import { useState } from "react";
import TaskList from "./TaskList";

export default function Main() {
  // Get the state of tasks
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Adding a new task
  function addTask(event) {
    event.preventDefault();
    const formIn = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    /* Get each new task added from the input field and trim whitespace */
    const newTask = formData.get("task").trim();

    if (!newTask) {
      alert("Task cannot be empty");
      return;
    }

    // task object
    const task = {
      name: newTask,
      status: "pending",
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    formIn.reset();
  }

  // Deleting a task
  function deleteTask(taskName) {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${taskName}"?`
    );

    if (isConfirmed) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.name !== taskName)
      );
    }
  }

  // Toggle task complete
  function toggleComplete(taskName) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === taskName ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Add filter label
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="flex flex-col sm:justify-center justify-center mt-20 mb-8 items-center w-full">
      <div className="flex flex-col gap-6 items-center w-full max-w-[500px]">
        <form
          onSubmit={addTask}
          className="flex w-full items-center justify-center gap-x-4"
        >
          <input
            type="text"
            className="h-10 flex min-w-[200px] max-w-[20rem] rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 text-sm text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-yellow-400"
            placeholder="add task, e.g. buy groceries"
            aria-label="Add task"
            name="task"
          />
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold uppercase rounded-lg shadow-md transition-all hover:shadow-lg focus:opacity-85">
            Add task
          </button>
        </form>
        {/* Filter Dropdown */}
        <div className="flex flex-row justify-center items-center w-full max-w-[250px] mt-10 gap-x-8">
          <p className="whitespace-nowrap">Filter tasks</p>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col sm:justify-center justify-center mt-8 mb-8 items-center w-full gap-x-4">
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}
