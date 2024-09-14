import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import ButtonComp from "../Button/Button";
import InputComp from "../Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function SettingsModalComp({ settingsOpen, handleSettingsOpen }) {
  const [changing, setChanging] = useState(false);
  const [loggingout, setLoggingout] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChangePassword = (passwordData) => {
    setChanging(true);
    const { oldPassword, newPassword } = passwordData;
    const data = new FormData();
    data.append("oldPassword", oldPassword);
    data.append("newPassword", newPassword);

    axios
      .post(`${import.meta.env.VITE_API_URL}/changePassword`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        reset();
        handleSettingsOpen();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setChanging(false);
      });
  };

  const handleLogout = async () => {
    setLoggingout(true);
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
        toast.success(response.data.message);
        reset();
        handleSettingsOpen();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoggingout(false);
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
      <DialogHeader className="text-4xl flex justify-center">
        Account Settings
      </DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="w-full">
                <InputComp
                  inputType="password"
                  inputPlaceholder="Old Password"
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
                  inputType="password"
                  inputPlaceholder="New Password"
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
                  type="submit"
                  title={
                    changing ? (
                      <>
                        Changing
                        <Spinner className="w-4 h-4" color="white" />
                      </>
                    ) : (
                      "Change Password"
                    )
                  }
                  btnClick={handleSubmit(handleChangePassword)}
                />
              </div>
            </div>
            <div className="flex justify-start items-start">
              <ButtonComp
                title={
                  loggingout ? (
                    <>
                      Loggingout
                      <Spinner className="w-4 h-4" color="white" />
                    </>
                  ) : (
                    "Logout"
                  )
                }
                btnClick={handleLogout}
              />
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
