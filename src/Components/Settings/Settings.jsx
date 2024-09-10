import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import ButtonComp from "../Button/Button";
import InputComp from "../Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SettingsModalComp({ settingsOpen, handleSettingsOpen }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logoutUser`,
        {}, // No need to send body data for logout
        {
          withCredentials: true,  
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog
      open={settingsOpen}
      handler={handleSettingsOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Account Settings</DialogHeader>
      <DialogBody>
        <form>
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="w-full">
                <InputComp
                  inputType="text"
                  inputPlaceholder="Type Title."
                  {...register("title", {
                    required: "Title is required.",
                  })}
                />
              </div>
              <div>
                {errors.title && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.title.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex justify-start items-start">
              <ButtonComp title="Logout" btnClick={handleLogout} />
            </div>
          </div>
          <DialogFooter>
            <ButtonComp
              btnClick={handleSettingsOpen}
              classes="mr-1"
              title="Cancel"
            />
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default SettingsModalComp;
