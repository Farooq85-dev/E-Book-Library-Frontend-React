import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import InputComp from "../../Components/Input/Input";
import ButtonComp from "../../Components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GrAssistListening } from "react-icons/gr";
import { GrAttachment } from "react-icons/gr";
import axios from "axios";

function AccountPage() {
  const [type, setType] = useState("Sign up");
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
  const onSubmitSignUp = async (data) => {
    let { userName, userSignupEmail, userSignupPassword } = data;

    let userSignupData = JSON.stringify({
      name: userName,
      email: userSignupEmail,
      password: userSignupPassword,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/registerUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userSignupData,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Login Successfully!");
        console.log(JSON.stringify(response.data));
        reset();
        setType("Sign in");
      })
      .catch((error) => {
        toast.error("Please try again!");
        console.log(error);
      });
  };

  let cook = document.cookie;
  console.log(cook);

  //Sign in user
  const onSubmitSignIn = async (data) => {
    let { userSigninEmail, userSigninPassword } = data;

    // Encode the email and password to handle special characters in the URL
    const encodedEmail = encodeURIComponent(userSigninEmail);
    const encodedPassword = encodeURIComponent(userSigninPassword);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_API_URL
      }/loginUser?email=${encodedEmail}&password=${encodedPassword}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Login Successfully!");
        console.log(JSON.stringify(response.data));
        reset();
        navigate("/library");
      })
      .catch((error) => {
        toast.error("Please try again!");
        console.error(error);
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
                <ButtonComp title="Sign Up" btnType="submit" classes="mt-6" />
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
                <ButtonComp title="Sign In" btnType="submit" classes="mt-6" />
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
