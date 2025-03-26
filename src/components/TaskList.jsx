import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function TaskList(props) {
  const { tasks, deleteTask, toggleComplete } = props;
  useEffect(() => {
    if (tasks.length === 0) {
      console.log("Your list is empty");
    }
  }, [tasks]); // Runs every time `tasks` changes

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
      <span
        className={`text-gray-800 flex-grow ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      ></span>

      {/* Task Name */}
      <span
        className={`text-gray-800 flex-grow ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.name}
      </span>

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
      {tasks.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <div className="show-task-list">
          <ul className="task-list" aria-live="polite">
            {taskListItems}
          </ul>
        </div>
      )}
    </section>
  );
}
