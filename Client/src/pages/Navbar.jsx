import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//optimized render
const Toaster =React.lazy(()=> import  ("../components/toast"));
const Modal =React.lazy(()=> import ("../modal/modal"));
const InputField =React.lazy(()=>import ('../components/InputField'));
//api 
import {  createNote } from "../api/notesApi";
import { getUser, logOut } from "../Utility/common";

function Navbar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toasMessage, setToastMessage] = useState("Hell0");
  const [toastType, setToastType] = useState("success");

  const onSubmit = async (data) => {
    let user = await getUser();
    let notes = {
      ...data,
    };
    notes.userId = JSON.parse(user).id;
    const createData = await createNote("/notes", notes);
    console.log(createData);
    if (createData.success) {
      setShowToast(true);
      setToastMessage(createData.message);
      setToastType("success");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    if (!createData.success) {
      setShowToast(true);
      setToastMessage(createData.message);
      setToastType("fail");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <Toaster
        message={toasMessage}
        isVisible={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
      <header
        className={`w-full fixed left-0 top-0 z-50 p-2 text-white nav_bg_color`}
      >
        <nav className="flex flex-row flex-wrap justify-between items-center text-white">
          <p>Mythili</p>
          <input
            placeholder="Search"
            className="bg-gray-100 text-black w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="button"
            className="rounded-lg shadow-lg  p-2  border-1 border-white cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <i class="fa-solid fa-plus"></i>Add Note{" "}
          </button>

          <button
            type="button"
            className="hover:text-black font-bold cursor-pointer"
            onClick={() => logOut(Navigate)}
          >
            Logout
          </button>
        </nav>
      </header>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center max-w-sm">
          <h5 className="text-2xl font-bold ">Add Notes</h5>
          <button
            type="button"
            className=" text-black rounded-full cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            {" "}
            <i class="fa-solid fa-close"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            label="Category"
            field="category"
            register={register}
            name="category"
            id="category"
          />
          <InputField
            type="text"
            label="Note Titel"
            field="title"
            register={register}
            name="title"
            id="title"
          />
          <InputField
            type="text"
            label="Description"
            field="description"
            register={register}
            name="description"
            id="description"
          />
          <div className="flex justify-end items-center gap-2">
            <button
              type="submit"
              className="mt-4 px-4 py-1 bg-sky-500 text-white rounded-lg cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-4 px-4 py-1 bg-red-500 text-white rounded-lg cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Navbar;
