import { useState } from "react";
import { ImCross } from "react-icons/im";
import { BiSolidErrorCircle } from "react-icons/bi";

const TaskModal = ({ handleAddTask, handleCloseTask }) => {
  const [requiredFields, setRequiredFields] = useState([]);
  const [task, setTask] = useState({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavourite: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "tags") {
      value = value ? value.split(",") : [];
    }
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAddTaskClick = (e) => {
    e.preventDefault();

    const requiredFieldsList = ["title", "description", "tags", "priority"];
    const missingFields = requiredFieldsList.filter((field) => {
      console.log(Array.isArray(task[field]))
      if (field === "tags" && Array.isArray(task[field])) {
        return task[field].length === 0;
      }
      return !task[field];
    });
    console.log(missingFields)

    if (missingFields.length > 0) {
      return setRequiredFields(missingFields);
    }

    handleAddTask(e, task);
  };

  return (
    <>
      <div className="bg-black bg-opacity-60 w-full h-full fixed left-0 top-0 z-50"></div>

      <form className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 mx-auto w-full h-[500px] overflow-y-scroll max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11">
        <button onClick={handleCloseTask}>
          {" "}
          <ImCross className="text-white ml-[600px]" />
        </button>
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          Add New Task
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
            {requiredFields.includes("title") && (
              <p className="text-red-500">
                <BiSolidErrorCircle className="inline" /> Title is required
              </p>
            )}
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
            {requiredFields.includes("description") && (
              <p className="text-red-500">
                <BiSolidErrorCircle className="inline" /> Description is
                required
              </p>
            )}
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
              />
              {requiredFields.includes("tags") && (
                <p className="text-red-500">
                  <BiSolidErrorCircle className="inline" /> Tags is required
                </p>
              )}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option>Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {requiredFields.includes("priority") && (
                <p className="text-red-500">
                  <BiSolidErrorCircle className="inline" /> Priority is required
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            onClick={handleAddTaskClick}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Create new Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskModal;
