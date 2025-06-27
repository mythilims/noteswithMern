import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import { getByIdNotes } from "../api/notesApi";
import Modal from "../modal/modal";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";

function NotesList() {
  const {data,loading,error}=useFetch('/notes')
  const {register,handleSubmit,formState:{errors},reset} =useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
 const editDelete =async(id) =>{
   try{
     let data =await getByIdNotes('/notes',id);
     console.log(data);
     if(data._id){
           reset(data)

           setIsModalOpen(true);

     }
     
   }catch(e){

   }
 }
   const onSubmit = async(data) =>{
     const notes ={
       ...data
     }
    //  const createData = await updateNote('/notes',notes);
    //  console.log(createData);
    //  if(!createData.success){
    //    return 
    //  }
     setIsModalOpen(false);
     alert.success('not added')
     
    }
  return (
    <>
      <Navbar />

      <div
        className={`grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] min-h-screen  w-full  shadow-lg 
  content_bg_color p-3 gap-4 pt-24`}
      >
        {!loading&&data.map((item, key) => {
          return (
            <>
              <div
                key={key}
                className="col-span-2 shadow-sm card_bg_color max-w-sm h-[200px] rounded-lg border-2 border-b-[#faf0ca] border-blue-200 hover:bg-gray-700 hover:text-white"
              >
                <div className="flex flex-warp justify-between items-ceneter ">
                  <p className=" font-bold  text-1xl  p-2 underline">
                    <span className="">Title</span>:{item.title}
                  </p>
                  <div className="gap-3 flex p-2 ">
                    <button className="rounded-sm shadow-sm  p-1 " onClick={()=>editDelete(item._id)}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button className="rounded-sm shadow-sm  p-1" onClick={()=>editDelete(item._id)}>
                      <i class="fa-solid fa-trash"></i>{" "}
                    </button>
                  </div>
                </div>
                

                <p className=" font-bold  text-1xl p-2 ">
                  <span className="">Category</span>:{item.category}
                </p>
                <p className="   font-bold  text-1xl  p-2 ">
                  <span className="">Des</span>: {item.description}
                </p>
              </div>
            </>
          );
        })}
      </div>
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

export default NotesList;
