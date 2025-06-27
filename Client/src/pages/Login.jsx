import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const SuccessToast = React.lazy(() => import("../components/toast"));
const InputField = React.lazy(() => import("../components/InputField"));
import { login } from "../api/userApi";
import { setToken, setUser } from "../Utility/common";
function Login() {
  const [isActive, setActive] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toasMessage, setToastMessage] = useState("Hell0");
  const [toastType, setToastType] = useState("success");

  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(isActive);

  //   faf0ca to 0d3b66
  //  006e90 to f18f01
  //   bg-gradient-to-b from-violet-500 to-violet-300
  const onSubmit = async (data) => {
    const user = {
      ...data,
    };
    const userDetails = await login(
      isActive ? "/users/login" : "/users/register",
      user
    );
    if (userDetails.success) {
      setToken(userDetails.token);
      setUser(userDetails.userDetails);
      setShowToast(true);

      setToastMessage(userDetails.message);
      setToastType("success");
      setTimeout(() => {
        setShowToast(false);
        if (isActive) navigator("/notesDashboard");
      }, 3000);
    } else if (!isActive && userDetails.success) {
      setActive((pre) => !pre);
      navigator("/");
      reset({ email: userDetails.email, password: userDetails.password });
    } else {
      setShowToast(true);
      setToastMessage(userDetails.error);
      setToastType("fail");
    }
  };
  return (
    <>
      <SuccessToast
        message={toasMessage}
        isVisible={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-9 w-full h-screen shadow-lg  login_bg_color">
        <div className="col-span-1 md:col-span-3 text-white flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Hello!</h2>
          <button
            type="button"
            onClick={() => setActive(!isActive)}
            className="bg-white text-black font-semibold px-6 py-2 rounded shadow-md hover:login_bg_bt_color"
          >
            {isActive ? "Signup" : "Login"}
          </button>
        </div>

        <div className="md:col-span-6 col-span-1 bg-white p-10 flex flex-col justify-center items-center p-2 m-2 ">
          <div className="max-w-sm flex flex-col justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center font-bold p-1 sm:text-sm md:text-2xl">
                {isActive ? "Login" : "Signup"}
              </h2>
              {!isActive && (
                <InputField
                  type="text"
                  label="Username"
                  field="username"
                  register={register}
                  name="username"
                  id="username"
                />
              )}
              <InputField
                type="email"
                label="Email"
                field="email"
                name="email"
                id="email"
                register={register}
              />
              <InputField
                type="password"
                label="Password"
                field="Password"
                name="password"
                id="password"
                register={register}
              />

              <div className="flex justify-center flex-wrap">
                <button
                  type="submit"
                  className="login_bg_bt_color sm:px-3  md:px-6 py-2 rounded-sm shadow-lg hover:bg-[#006e90] text-white font-semibold"
                >
                  {!isActive ? "Signup" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
