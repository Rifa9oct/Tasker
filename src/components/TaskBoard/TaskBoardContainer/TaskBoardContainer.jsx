import { useContext } from "react";
import { TaskContext } from "../../../contexts/TaskContext";
import TaskModal from "../TaskModal";
import DeleteAllModal from "../DeleteAllModal";
import DeleteModal from "../DeleteModal";
import TaskAction from "../TaskAction";
import TaskList from "../TaskList";
import notask from "./../../../assets/notask.png"

const TaskBoardContainer = () => {
  const { showModal, showDeleteAllModal, showDeleteModal, tasks } =
    useContext(TaskContext);

  return (
    <>
      {showModal && <TaskModal></TaskModal>}

      {showDeleteAllModal && <DeleteAllModal></DeleteAllModal>}

      {showDeleteModal && <DeleteModal></DeleteModal>}

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
    </>
  );
};

export default TaskBoardContainer;
