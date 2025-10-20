"use client"

import React, { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import toast from 'react-hot-toast';
import TaskList from './TaskList';

const TaskCard = () => {
    const { tasks, deleteTask, filteredTasks, searchTerm } = useTaskStore();

    const [isOpenModal, setIsModalOpen] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setTaskIdToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskIdToDelete) {
            deleteTask(taskIdToDelete);
            setTaskIdToDelete(null);
            setIsModalOpen(false);
            toast.success("Task Deleted Successfully");
        }
    };

    const tasksToRender = searchTerm ? filteredTasks() : Object.entries(tasks);

    return (
        <div className="w-full max-w-[80%] mx-auto p-8 bg-gray-200 rounded-xl">
            <TaskList
                tasksToRender={tasksToRender}
                handleDeleteClick={handleDeleteClick}
                isOpenModal={isOpenModal}
                setIsModalOpen={setIsModalOpen}
                taskIdToDelete={taskIdToDelete}
                confirmDelete={confirmDelete}
            />
        </div>
    );
};

export default TaskCard;
