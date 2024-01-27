import { useState } from "react";
import { initialTasks } from "../../TaskData/initialTasks";
import { SearchContext } from "../../contexts/SearchContext";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteAllModal from "./DeleteAllModal";
import DeleteModal from "./DeleteModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [deleteTask, setDeleteTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAddTask = (e, newTask) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setShowModal(false);
    toast.success("Task added successfully !", {
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

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="mb-20">
        {showModal && (
          <TaskModal
            handleAddTask={handleAddTask}
            handleCloseTask={handleCloseTask}
          ></TaskModal>
        )}
        {showDeleteAllModal && (
          <DeleteAllModal
            handleDeleteTask={handleDeleteTask}
            handleDeleteAllTask={handleDeleteAllTask}
            setShowDeleteAllModal={setShowDeleteAllModal}
          ></DeleteAllModal>
        )}
        {showDeleteModal && (
          <DeleteModal
            deleteTask={deleteTask}
            handleDeleteTask={handleDeleteTask}
            setShowDeleteModal={setShowDeleteModal}
          ></DeleteModal>
        )}

        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>

              <TaskAction
                setShowDeleteAllModal={setShowDeleteAllModal}
                handleAddTask={() => setShowModal(true)}
              ></TaskAction>
            </div>

            <TaskList
              setShowDeleteModal={setShowDeleteModal}
              handleDeleteTask={handleDeleteTask}
              handleisFavourite={handleisFavourite}
              tasks={tasks}
              searchValue={searchValue}
              setDeleteTask={setDeleteTask}
            ></TaskList>
          </div>
        </div>
        <ToastContainer />
      </div>
    </SearchContext.Provider>
  );
};

export default TaskBoard;
