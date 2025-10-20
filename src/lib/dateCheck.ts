export const isDueDatePassed = (dueDate: string) => {
  const currentDate = new Date();
  const taskDueDate = new Date(dueDate);
  return taskDueDate < currentDate;
};

export const getDueDateStatus = (dueDate: string): string | null => {
  const taskDueDate = new Date(dueDate);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (taskDueDate.toDateString() === today.toDateString()) {
    return "Due Today";
  } else if (taskDueDate.toDateString() === tomorrow.toDateString()) {
    return "Due Tomorrow";
  }

  return null;
};
