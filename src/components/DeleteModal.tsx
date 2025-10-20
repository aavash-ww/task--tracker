import React, { useRef } from 'react'
import { X } from 'lucide-react';



const DeleteModal: React.FC<AppTypes.ModalProps> = ({ isOpen, onClose, onConfirm }) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    if (isOpen && dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
        dialogRef.current.close();
    }

    return (
        <dialog
            ref={dialogRef}
            className="max-w-xs p-6 rounded-lg bg-white shadow-xl backdrop:bg-black/50 
                        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClose={onClose}
        >
            <div className="flex flex-col items-center gap-4">

                <div className="border-2 border-red-400 rounded-full p-4 w-fit">
                    <X size={32} className='text-red-400' />
                </div>
                <h3 className='text-xl text-gray-700'>Are you Sure?</h3>
                <p className='text-center text-sm text-gray-500'>Do you really want to delete these records? This process cannot be undone.</p>
            </div>

            {/* Buttons  */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                    aria-label="Close modal"
                >
                    Cancel
                </button>

                <button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-500"
                >
                    Delete
                </button>
            </div>

        </dialog>
    )
}

export default DeleteModal