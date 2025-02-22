import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Drag-and-drop Item Type
const ItemType = "TASK";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from MongoDB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Function to update task category in the database
  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: newCategory }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Task Management</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Task Columns */}
          <TaskColumn
            title="To-Do"
            tasks={tasks.filter((task) => task.category === "To-Do")}
            category="To-Do"
            onDrop={updateTaskCategory}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasks.filter((task) => task.category === "In Progress")}
            category="In Progress"
            onDrop={updateTaskCategory}
          />
          <TaskColumn
            title="Done"
            tasks={tasks.filter((task) => task.category === "Done")}
            category="Done"
            onDrop={updateTaskCategory}
          />
        </div>
      </div>
    </DndProvider>
  );
};

// Component to display each category
const TaskColumn = ({ title, tasks, category, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      console.log(`Dropped task ${item.id} into ${category}`); // Debugging
      onDrop(item.id, category);
    },
  });

  return (
    <div ref={drop} className="bg-gray-100 p-4 rounded shadow-lg min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

// Component for each task
const TaskItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      className={`p-3 bg-white shadow rounded mb-3 cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <button className="btn bg-blue-500 text-white">{task.category}</button>
    </li>
  );
};

export default TaskBoard;
