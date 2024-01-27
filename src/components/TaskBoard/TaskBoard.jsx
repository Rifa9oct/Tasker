import { useState } from "react";
import TaskModal from "./TaskModal";
import { initialTasks } from "../../TaskData/initialTasks";
import TaskList from "./TaskList";
import TaskAction from "./TaskAction";
import { SearchContext } from "../../contexts/SearchContext";

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAddTask = (e, newTask) => {
    e.preventDefault();
    setTasks([...tasks, newTask])  
    setShowModal(false)
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
        {showModal && <TaskModal handleAddTask={handleAddTask} handleCloseTask={handleCloseTask}></TaskModal>}

        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>

              <TaskAction
                handleAddTask={() => setShowModal(true)}
              ></TaskAction>
            </div>

            <TaskList
              handleisFavourite={handleisFavourite}
              tasks={tasks}
              searchValue={searchValue}
            ></TaskList>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default TaskBoard;
