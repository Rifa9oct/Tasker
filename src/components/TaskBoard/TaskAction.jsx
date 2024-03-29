import { useContext } from "react";
import SearchTask from "./SearchTask";
import { TaskContext } from "../../contexts/TaskContext";

const TaskAction = () => {
  const { tasks, setShowModal, setShowDeleteAllModal } = useContext(TaskContext)
  return (
    <div className="flex items-center space-x-5">
      <SearchTask></SearchTask>

      <button
        onClick={() => setShowModal(true)}
        className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Add Task
      </button>
      <button
        disabled={tasks.length === 0}
        onClick={() => setShowDeleteAllModal(true)}
        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
      >
        Delete All
      </button>
    </div>
  );
};

export default TaskAction;
