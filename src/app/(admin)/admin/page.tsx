import React from 'react'
import CreateTaskForm from '@/components/CreateTaskForm'

const page = () => {
    return (
        <div className='px-20 mt-8'>
            <h1 className='text-2xl font-orbiton font-semibold mb-5'>Create Task</h1>
            <CreateTaskForm isEdit={false} />
        </div>

    )
}

export default page