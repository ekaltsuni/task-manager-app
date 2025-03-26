import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function TaskList(props) {
  const { tasks, deleteTask, toggleComplete } = props;
  useEffect(() => {
    if (tasks.length === 0) {
      console.log("Your list is empty");
    }
  }, [tasks]); // Runs every time tasks changes

  /* Map tasks so that they appear on screen as a list */
  const taskListItems = tasks.map((task) => (
    <li
      key={task.name}
      className="flex justify-between items-center px-4 py-2 rounded-lg  gap-x-6"
    >
      {/* Checkbox to mark task as completed */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.name)}
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-400 checked:bg-teal-400 checked:before:bg-teal-400 hover:before:opacity-10"
      />

      {/* Task Name */}
      <div className="flex-grow">{task.name}</div>

      {/* Status Label */}
      <div
        className={`text-xs font-bold px-2 py-1 rounded-lg ${
          task.completed
            ? "bg-green-100 text-teal-400"
            : "bg-yellow-100 text-yellow-400"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </div>

      {/* Trash Icon */}

      <button
        onClick={() => deleteTask(task.name)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </li>
  ));

  return (
    <section>
      <h2>My tasks</h2>
      {tasks.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <div className="show-task-list font-light size-1.2">
          <ul className="task-list">{taskListItems}</ul>
        </div>
      )}
    </section>
  );
}
