
function InputField ({label,type,register,name,id}) {
    return (
        <>
         <div className="mb-4">
          <label className=" font-semibold sm:text-base  md:text-sm">{label}:</label>
          <input {...register(name)} name={name} id={id}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            type={type}
          />
        </div>
        </>
    )
}

export default InputField;