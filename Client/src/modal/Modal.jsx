function Modal ({isOpen,onClose,children}){
    if(!isOpen) return null
    return (
        <>
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 ">

            <div className="rounded-2xl shadow-lg max-w-sm w-96 p-6 relative bg-white">
       <button onClick={onClose}>

       </button>
       {children}
      </div>
            </div>
        </>
    )
}

export default Modal;