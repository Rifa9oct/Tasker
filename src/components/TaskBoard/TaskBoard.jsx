import { useReducer, useState } from "react";
import { initialTasks } from "../../TaskData/initialTasks";
import { TaskContext } from "../../contexts/TaskContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskBoardContainer from "./TaskBoardContainer/TaskBoardContainer";
import taskReducer from "../../reducers/taskReducer";

const TaskBoard = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const [deleteTask, setDeleteTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (e, newTask, isAdd) => {
    e.preventDefault();

    const actionType = isAdd ? "add_task" : "edit_task";

    dispatch({
      type: actionType,
      payload: newTask,
      setTaskToUpdate
    });

    toast.success(`Task has ${isAdd ? "added" : "edited"} successfully !`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleDeleteAllTask = () => {
    dispatch({
      type: "deleteAll_task",
    });
  };

  const handleDeleteTask = (task) => {
    dispatch({
      type: "delete_task",
      payload: task.id,
    });
  };

  const handleCloseTask = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  const handleisFavourite = (taskId) => {
    dispatch({
      type: "isFavourite",
      payload: taskId,
    });
  };

  const taskData = {
    tasks,
    showModal,
    showDeleteAllModal,
    showDeleteModal,
    searchValue,
    setSearchValue,
    taskToUpdate,
    handleAddTask,
    handleCloseTask,
    handleDeleteTask,
    handleDeleteAllTask,
    setShowDeleteAllModal,
    deleteTask,
    setShowDeleteModal,
    setShowModal,
    handleEditTask,
    handleisFavourite,
    setDeleteTask,
  };

  return (
    <TaskContext.Provider value={taskData}>
      <div className="mb-20">
        <TaskBoardContainer></TaskBoardContainer>
        <ToastContainer />
      </div>
    </TaskContext.Provider>
  );
};

export default TaskBoard;
