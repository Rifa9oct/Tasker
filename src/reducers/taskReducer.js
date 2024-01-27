export default function taskReducer(tasks, action) {
  switch (action.type) {
    case "add_task": {
      const updatedTasks = [...tasks, action.payload];
      return updatedTasks;
    }
    case "edit_task": {
     return tasks.map((task) => {
        if (task.id === action.payload.id) {
          action.setTaskToUpdate(null);
          return action.payload;
        }
        return task;
      });
    }

    case "delete_task": {
      const updatedTasks = tasks.filter((task) => task.id !== action.payload);
      return updatedTasks;
    }

    case "deleteAll_task": {
      return [];
    }

    case "isFavourite": {
      const updatedTasks = tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isFavourite: !task.isFavourite }
          : task
      );
      return updatedTasks;
    }
    default: {
      throw Error(`No action matched with ${action.type}`);
    }
  }
}
