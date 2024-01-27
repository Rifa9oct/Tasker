import { useState } from "react";
import { initialTasks } from "../../TaskData/initialTasks";
import { TaskContext } from "../../contexts/TaskContext";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteAllModal from "./DeleteAllModal";
import DeleteModal from "./DeleteModal";
import notask from "./../../assets/notask.png";

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [deleteTask, setDeleteTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (e, newTask, isAdd) => {
    e.preventDefault();
    if (isAdd) {
      setTasks([...tasks, newTask]);
      toast.success("Task has added successfully !", {
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
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            setTaskToUpdate(null);
            return newTask;
          }
          return task;
        })
      );
      toast.success("Task has edit successfully !", {
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
    }
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleDeleteTask = (task) => {
    const filteredTask = tasks.filter((item) => item.id !== task.id);
    setTasks(filteredTask);
  };

  const handleCloseTask = () => {
    setShowModal(false);
    setTaskToUpdate(null);
  };

  const handleisFavourite = (taskId) => {
    const favourite = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isFavourite: !task.isFavourite };
      } else {
        return task;
      }
    });
    setTasks(favourite);
  };

  const taskData = {
    tasks,
    searchValue, setSearchValue,
    taskToUpdate, handleAddTask, handleCloseTask,
    handleDeleteTask, handleDeleteAllTask, setShowDeleteAllModal,
    deleteTask, setShowDeleteModal,
    setShowModal,
    handleEditTask, handleisFavourite, setDeleteTask,
  }

  return (
    <TaskContext.Provider value={taskData}>
      <div className="mb-20">
        {showModal && (
          <TaskModal></TaskModal>
        )}

        {showDeleteAllModal && (
          <DeleteAllModal></DeleteAllModal>
        )}

        {showDeleteModal && (
          <DeleteModal></DeleteModal>
        )}

        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>

              <TaskAction></TaskAction>
            </div>

            {tasks.length > 0 ? (
              <TaskList></TaskList>
            ) : (
              <div>
                <img className="w-1/4 mx-auto mb-8" src={notask} alt="notask" />
                <h1 className="text-3xl text-yellow text-center font-bold">
                  There are no tasks! Please add some task.
                </h1>
              </div>
            )}
          </div>
        </div>
        
        <ToastContainer />
      </div>
    </TaskContext.Provider>
  );
};

export default TaskBoard;
