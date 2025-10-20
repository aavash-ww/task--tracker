"use client"

import React from 'react'
import CreateTaskForm from '@/components/CreateTaskForm'
import { useParams } from 'next/navigation'
import { useTaskStore } from '@/store/taskStore';

const Page = () => {
    const { id } = useParams<{ id: string }>()

    const taskToEdit = useTaskStore((state) => state.tasks[id]);

    if (!taskToEdit) {
        return <div>Task not found</div>;
    }
    return (
        <div className='px-20 mt-8'>
            <h1 className='text-2xl font-orbiton font-semibold mb-5'>Update Task</h1>
            <CreateTaskForm isEdit={true} taskToEdit={taskToEdit} />
        </div>
    )
}

export default Page