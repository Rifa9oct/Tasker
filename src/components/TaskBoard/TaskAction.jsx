import SearchTask from "./SearchTask";

const TaskAction = ({ handleAddTask, setShowDeleteAllModal }) => {
  return (
    <div className="flex items-center space-x-5">
      <SearchTask></SearchTask>

      <button
        onClick={handleAddTask}
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Add Task
      </button>
      <button
        onClick={()=> setShowDeleteAllModal(true)}
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Delete All
      </button>
    </div>
  );
};

export default TaskAction;
