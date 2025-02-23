import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do", // Default category
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTask = {
      ...task,
      timestamp: new Date().toISOString(), // Auto-generated timestamp
    };

    try {
      const response = await fetch("https://task-manager-server-two-iota.vercel.app/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task");

      toast.success("Task added successfully!");
      setTask({ title: "", description: "", category: "To-Do" }); // Reset form
    } catch (error) {
      toast.error("Error adding task!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          maxLength={50}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          maxLength={200}
          className="w-full p-2 border rounded mb-4"
        ></textarea>

        <label className="block mb-2 font-medium">Category:</label>
        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
