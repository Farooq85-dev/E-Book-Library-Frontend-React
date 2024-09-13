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
import { toast } from "react-toastify";

function SettingsModalComp({ settingsOpen, handleSettingsOpen }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChangePassword = (passwordData) => {
    const { oldPassword, newPassword } = passwordData;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_API_URL
      }/changePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`,
      headers: {},
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Password Updated Successfully!");
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please Try Again!");
      });
  };

  const handleLogout = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/logoutUser`,
      headers: {},
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="w-full">
                <InputComp
                  inputType="text"
                  inputPlaceholder="Type Title."
                  {...register("oldPassword", {
                    required: "Old Password is required.",
                  })}
                />
              </div>
              <div>
                {errors.oldPassword && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.oldPassword.message}
                  </Typography>
                )}
              </div>
              <div className="w-full">
                <InputComp
                  inputType="text"
                  inputPlaceholder="Type Title."
                  {...register("newPassword", {
                    required: "New Password is required.",
                  })}
                />
              </div>
              <div>
                {errors.newPassword && (
                  <Typography color="red" className="text-sm font-medium">
                    {errors.newPassword.message}
                  </Typography>
                )}
              </div>
              <div>
                <ButtonComp
                  btnType="submit"
                  title="Change Password"
                  btnClick={handleChangePassword}
                />
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
