import React from 'react'
import { Toaster } from 'react-hot-toast'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster position="top-right" />
            <main className='w-full max-w-[90%] mx-auto px-4'>
                {children}
            </main>
        </>

    )
}

export default AdminLayout