import React, { useState } from "react";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import InputComp from "../../Components/Input/Input";
import ButtonComp from "../../Components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GrAssistListening } from "react-icons/gr";
import { GrAttachment } from "react-icons/gr";
import FormData from "form-data";
import axios from "axios";

function AccountPage() {
  const [type, setType] = useState("Sign up");
  const [registering, setRegistering] = useState(false);
  const [signing, setSigning] = useState(false);
  const navigate = useNavigate();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
    reset,
  } = useForm();

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
  } = useForm();

  // Registering User
  const onSubmitSignUp = async (signupData) => {
    setRegistering(true);
    let { userName, userSignupEmail, userSignupPassword } = signupData;

    let data = new FormData();
    data.append("name", userName);
    data.append("email", userSignupEmail);
    data.append("password", userSignupPassword);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/registerUser`,
      headers: {},
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success(response.data.message);
        reset();
        setType("Sign in");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setRegistering(false);
      });
  };

  //Sign in user
  const onSubmitSignIn = async (signinData) => {
    setSigning(true);
    let { userSigninEmail, userSigninPassword } = signinData;

    let data = new FormData();
    data.append("email", userSigninEmail);
    data.append("password", userSigninPassword);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/loginUser`,
      headers: {},
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success(response.data.message);
        reset();
        navigate("/library");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setSigning(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pl-10 pr-10 lg:pl-0 lg:pr-0">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden mainForm">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1673241838797-7430d7baad3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1pbmltaWxzdGljJTIwYmFja2dyb3VuZHN8ZW58MHx8MHx8fDA%3D')`,
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8 formPadding">
          <Card className="p-4" shadow={false}>
            <div className="mb-4 flex justify-center items-center">
              {type === "Sign up" ? (
                <GrAssistListening color="black " size={40} />
              ) : (
                <GrAttachment color="black " size={40} />
              )}
            </div>
            <Typography className="font-bold text-4xl text-black text-center">
              {type}
            </Typography>
            <Typography className="mt-2 text-center">
              {type === "Sign up" ? (
                <span className="text-black text-lg font-medium">
                  Create an Account and create your own library.
                </span>
              ) : (
                <span className="text-black text-xl font-medium">
                  Welcome back! Please login to continue.
                </span>
              )}
            </Typography>
            {type === "Sign up" && (
              <form
                className="mt-8 mb-2 w-full"
                onSubmit={handleSubmitSignUp(onSubmitSignUp)}
              >
                <div className="mb-4 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <InputComp
                      inputType="text"
                      inputPlaceholder="Type user name"
                      {...registerSignUp("userName", {
                        required: "Name is required.",
                      })}
                    />
                    {errorsSignUp.userName && (
                      <Typography color="red" className="text-sm font-medium">
                        {errorsSignUp.userName.message}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputComp
                      inputType="email"
                      inputPlaceholder="Type email"
                      {...registerSignUp("userSignupEmail", {
                        required: "Email is required.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Invalid email address.",
                        },
                      })}
                    />
                    {errorsSignUp.userSignupEmail && (
                      <Typography color="red" className="text-sm font-medium">
                        {errorsSignUp.userSignupEmail.message}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputComp
                      inputType="password"
                      inputPlaceholder="Type password"
                      {...registerSignUp("userSignupPassword", {
                        required: "Password is required.",
                        pattern: {
                          value: /^.{8,10}$/,
                          message:
                            "Password must be at least 8 to 10 characters long.",
                        },
                      })}
                    />
                    {errorsSignUp.userSignupPassword && (
                      <Typography color="red" className="text-sm font-medium">
                        {errorsSignUp.userSignupPassword.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <ButtonComp
                  title={
                    registering ? (
                      <>
                        <span>Registering</span>
                        <Spinner className="w-4 h-4" color="white" />
                      </>
                    ) : (
                      "Sign Up"
                    )
                  }
                  btnType="submit"
                  classes="mt-6"
                />
                <Typography className="mt-4 text-center text-certiary font-normal">
                  Already have an account?
                  <a
                    className="ml-1 cursor-pointer text-certiary font-bold"
                    onClick={() => setType("Sign in")}
                  >
                    Sign in
                  </a>
                </Typography>
              </form>
            )}
            {type === "Sign in" && (
              <form
                className="mt-8 mb-2 w-full"
                onSubmit={handleSubmitSignIn(onSubmitSignIn)}
              >
                <div className="mb-4 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <InputComp
                      inputType="email"
                      inputPlaceholder="Type email"
                      {...registerSignIn("userSigninEmail", {
                        required: "Email is required.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Invalid email address.",
                        },
                      })}
                    />
                    {errorsSignIn.userSigninEmail && (
                      <Typography color="red" className="text-sm font-medium">
                        {errorsSignIn.userSigninEmail.message}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputComp
                      inputType="password"
                      inputPlaceholder="Type password"
                      {...registerSignIn("userSigninPassword", {
                        required: "Password is required.",
                        minLength: {
                          message: "Invalid password",
                        },
                      })}
                    />
                    {errorsSignIn.userSigninPassword && (
                      <Typography color="red" className="text-sm font-medium">
                        {errorsSignIn.userSigninPassword.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <ButtonComp
                  title={
                    signing ? (
                      <>
                        <span>signingin</span>
                        <Spinner className="w-4 h-4" color="white" />
                      </>
                    ) : (
                      "Sign In"
                    )
                  }
                  btnType="submit"
                  classes="mt-6"
                />
                <Typography className="mt-4 text-certiary text-center font-normal">
                  Don't have an account?
                  <a
                    className="ml-1 cursor-pointer text-certiary font-bold"
                    onClick={() => setType("Sign up")}
                  >
                    Sign up
                  </a>
                </Typography>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
