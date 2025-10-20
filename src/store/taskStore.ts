import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create<AppTypes.TaskStore>()(
  persist(
    (set, get) => ({
      tasks: {},
      searchTerm: "",

      setSearchTerm: (term: string) => set({ searchTerm: term }),

      filteredTasks: (): [string, AppTypes.Task][] => {
        const searchTerm = get().searchTerm.toLowerCase();
        return Object.entries(get().tasks).filter(([_, task]) =>
          task.title.toLowerCase().includes(searchTerm)
        );
      },

      addTask: (task) => {
        const allTasksList = { ...get().tasks, [task.id]: task };
        set({ tasks: allTasksList });
      },

      updateTask: (updatedTask) => {
        const updatedTasksList = {
          ...get().tasks,
          [updatedTask.id]: updatedTask,
        };
        set({ tasks: updatedTasksList });
      },

      deleteTask: (id) => {
        const { [id]: _, ...rest } = get().tasks;
        set({ tasks: rest });
      },
    }),
    {
      name: "task-storage",
    }
  )
);
