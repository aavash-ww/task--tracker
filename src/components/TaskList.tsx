"use client"

import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { getDueDateStatus, isDueDatePassed } from '@/lib/dateCheck';

interface TaskListProps {
    tasksToRender: [string, AppTypes.Task][];
    handleDeleteClick: (id: string) => void;
    isOpenModal: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    taskIdToDelete: string | null;
    confirmDelete: () => void;
}

const TaskList = ({
    tasksToRender,
    handleDeleteClick,
    isOpenModal,
    setIsModalOpen,
    taskIdToDelete,
    confirmDelete
}: TaskListProps) => {
    return (
        <ul className="grid grid-cols-4 gap-6">
            {tasksToRender.map(([id, task]) => {
                const dueDateStatus = getDueDateStatus(task.dueDate);
                return (
                    <li
                        key={id}

                        className={`p-4 border border-gray-300 rounded-md ${isDueDatePassed(task.dueDate) ? "bg-red-200" : "bg-white"
                            }`}
                    >
                        <h4 className="text-xl font-bold">{task.title}</h4>
                        <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                        <p className="text-sm text-gray-600">Status: {task.status}</p>

                        <div className='flex items-center gap-4 mt-6'>
                            <Link
                                className='border border-gray-400 rounded bg-gray-100 p-1'
                                href={`/admin/${id}/edit`}
                            >
                                <Pencil size={24} className='text-gray-400' />
                            </Link>

                            <button
                                onClick={() => handleDeleteClick(id)}
                                className='border border-red-400 rounded bg-red-100 p-1 cursor-pointer'
                            >
                                <Trash size={24} className='text-red-500' />
                            </button>

                            <DeleteModal
                                isOpen={isOpenModal}
                                onClose={() => setIsModalOpen(false)}
                                onConfirm={confirmDelete}
                            />
                        </div>
                        {dueDateStatus && (
                            <span className="text-xs text-red-600 rounded-full mt-2 inline-block">
                                Note: {dueDateStatus}
                            </span>
                        )}
                    </li>
                )
            })}
        </ul>
    );
};

export default TaskList;
