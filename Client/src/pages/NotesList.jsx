import React, { useState } from "react";
const Navbar = React.lazy(() => import("./Navbar"));
const Modal = React.lazy(() => import("../modal/modal"));
const InputField = React.lazy(() => import("../components/InputField"));
import { useForm } from "react-hook-form";
import { getByIdNotes } from "../api/notesApi";
import useFetch from "../hooks/useFetch";

function NotesList() {
  const { data, loading, error } = useFetch("/notes");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editDelete = async (id) => {
    try {
      let data = await getByIdNotes("/notes", id);
      console.log(data);
      if (data._id) {
        reset(data);

        setIsModalOpen(true);
      }
    } catch (e) {}
  };
  const onSubmit = async (data) => {
    const notes = {
      ...data,
    };
    
    setIsModalOpen(false);
    alert.success("not added");
  };
  return (
    <>
      <Navbar />

      <div
        className={`flex flex-wrap  gap-4 p-3 pt-24 min-h-screen w-full shadow-lg content_bg_color`}
      >
        {!loading ? (
          data.map((item, key) => (
            <div
              key={key}
              className="w-[250px] h-[200px] shadow-sm card_bg_color rounded-lg border-2 border-b-[#faf0ca] border-blue-200 hover:bg-gray-700 hover:text-white flex flex-col  p-3"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold underline">Title: {item.title}</p>
                <div className="flex gap-2">
                  <button
                    className="rounded-sm shadow-sm cursor-pointer p-1"
                    onClick={() => editDelete(item._id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="rounded-sm shadow-sm p-1 cursor-pointer"
                    onClick={() => editDelete(item._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <p className="font-bold text-sm mt-2">
                Category: {item.category}
              </p>
              <p className="font-bold text-sm">Des: {item.description}</p>
            </div>
          ))
        ) : (
          <>
            <svg className="animate-spin h-screen w-full mr-3 text-white"></svg>
            <span className="text-white">Loading...</span>
          </>
        )}
      </div>

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

export default NotesList;
