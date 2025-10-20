declare namespace AppTypes {
  interface Task {
    id: string;
    title: string;
    dueDate: string;
    status: "Pending" | "Done";
  }

  interface TaskStore {
    tasks: { [key: string]: Task };
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredTasks: () => [string, Task][];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
  }

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
}
