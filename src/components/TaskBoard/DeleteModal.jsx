import { IoWarningOutline } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";

const DeleteModal = ({setShowDeleteModal, handleDeleteTask, deleteTask}) => {
    
  const handleClick = () => {
    handleDeleteTask(deleteTask);
    setShowDeleteModal(false);
    toast.success("Task delete successfully !", {
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

  return (
    <>
      <div className="bg-black bg-opacity-60 w-full h-full fixed left-0 top-0 z-50"></div>
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 flex flex-col justify-center items-center w-[450px] py-12 bg-white rounded-md shadow-md">
        <IoWarningOutline className="text-red-500 text-8xl" />
        <h1 className="text-center text-black mb-12 text-4xl font-bold">
          Are you sure? <br />{" "}
          <span className="text-xl">You want to delete it!</span>
        </h1>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleClick}
            className="bg-blue-500 px-5 py-3 rounded-md"
          >
            Yes, delete it!
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-red-500 px-5 py-3 rounded-md"
          >
            Cancle
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
