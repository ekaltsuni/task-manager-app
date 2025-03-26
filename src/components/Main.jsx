import React from "react";
import { useState } from "react";
import TaskList from "./TaskList";

export default function Main() {
  // Get the state of tasks
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();
    const formIn = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    /* Get each new task added from the input field */
    const newTask = formData.get("task");

    const task = {
      name: newTask,
      status: "pending",
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    formIn.reset();
  }

  function deleteTask(taskName) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.name !== taskName));
  }

  function toggleComplete(taskName) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === taskName ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="flex flex-col sm:justify-center justify-center mt-20 mb-8 items-center w-full">
      <div className="flex flex-col gap-6 items-center w-full max-w-[500px]">
        <form onSubmit={addTask} className="flex w-full items-center gap-x-4">
          <input
            type="text"
            className="h-10 flex-1 min-w-[200px] max-w-[20rem] rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 text-sm text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-teal-400"
            placeholder="add a task"
            aria-label="Add task"
            name="task"
          />
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold uppercase rounded-lg shadow-md transition-all hover:shadow-lg focus:opacity-85">
            Add task
          </button>
        </form>
        <div className="flex flex-col sm:justify-center justify-center mt-8 mb-8 items-center w-full gap-x-4">
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}
