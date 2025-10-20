"use client"

import React, { useState, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateTaskForm = ({ isEdit, taskToEdit }: { isEdit: boolean; taskToEdit?: AppTypes.Task }) => {

  const router = useRouter();
  const { addTask, updateTask } = useTaskStore();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<Omit<AppTypes.Task, "id">>({
    title: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (isEdit && taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        dueDate: taskToEdit.dueDate,
        status: taskToEdit.status,
      });
    }
  }, [isEdit, taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate) {
      toast.error("All fields are required");
      return;
    }

    if (!isEdit) {
      const newTask = {
        id: crypto.randomUUID(),
        ...formData,
      };

      addTask(newTask);
      toast.success("Task Added Succesfully");
    } else {
      const updatedTask = {
        id: taskToEdit?.id || "",
        ...formData,
      };

      updateTask(updatedTask);
      toast.success("Task Updated Succesfully");
      router.push('/')
    }

    setFormData({
      title: "",
      dueDate: "",
      status: "Pending",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="w-md">
          <label htmlFor="title" className="block text-xl font-medium">
            Task Title
          </label>
          <textarea
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800"
          />
        </div>

        {/* Due Date */}
        <div className="w-sm">
          <label htmlFor="dueDate" className="block text-xl font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            min={today}
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800"
          />
        </div>

        {/* Status */}
        <div className="w-[120px]">
          <label htmlFor="status" className="block text-xl font-medium">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800"
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-fit py-2 px-4 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          >
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTaskForm;
