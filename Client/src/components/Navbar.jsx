import { useState } from "react";
import Modal from "../modal/modal";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { getNotes, createNote } from '../api/notesApi';
import {logOut} from '../Utility/common'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let Navigate =useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
   const onSubmit = async(data) =>{
    const notes ={
      ...data
    }
    const createData = await createNote('/notes',notes);
    console.log(createData);
    if(!createData.success){
      return 
    }
    setIsModalOpen(false);
    alert.success('not added')
    
   }
  return (
    <>
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
            className="rounded-lg shadow-lg  p-2  border-1 border-white "
            onClick={() => setIsModalOpen(true)}
          >
            <i class="fa-solid fa-plus"></i>Add Note{" "}
          </button>

          <button type="button" className="hover:text-black font-bold" onClick={()=>logOut(Navigate)}>Logout</button>
        </nav>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center max-w-sm">
          <h5 className="text-2xl font-bold ">Add Notes</h5>
          <button
            className=" text-black rounded-full"
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
          <button type="submit" className="mt-4 px-4 py-1 bg-sky-500 text-white rounded-lg">
            Save
          </button>
          <button className="mt-4 px-4 py-1 bg-red-500 text-white rounded-lg">
            Reset
          </button>
          
        </div>
          </form>
      </Modal>
      
    </>
  );
}

export default Navbar;
