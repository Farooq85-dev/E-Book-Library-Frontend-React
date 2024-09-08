import React, { useState } from "react";
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
import FormData from "form-data";
import axios from "axios";
import { toast } from "react-toastify";
import { UploaderComp } from "../Uploader/uplaoder";

function AddBookModalComp({ open, handleOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addBook = (bookData) => {
    let { title, author, description, price, publishDate, bookImage } =
      bookData;
    console.log(title, author, description, price, publishDate, bookImage[0]);

    let data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("description", description);
    data.append("price", price);
    data.append("publishDate", publishDate);
    data.append("bookImage", bookImage[0]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/addBook`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("You Book has been added succcessfully!");
        reset();
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please try again!");
      });
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Its a simple modal.</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(addBook)}>
            <div className="flex flex-col justify-center items-center gap-6">
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
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full">
                  <InputComp
                    inputType="text"
                    inputPlaceholder="Type Author."
                    {...register("author", {
                      required: "Author is required.",
                    })}
                  />
                </div>
                <div>
                  {errors.author && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.author.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full">
                  <InputComp
                    inputType="text"
                    inputPlaceholder="Type Description."
                    {...register("description", {
                      required: "Description is required.",
                    })}
                  />
                </div>
                <div className="w-full">
                  {errors.description && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.description.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full">
                  <InputComp
                    inputType="number"
                    inputPlaceholder="Type Price."
                    {...register("price", {
                      required: "Price is required.",
                    })}
                  />
                </div>
                <div>
                  {errors.price && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.price.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full">
                  <InputComp
                    inputType="text"
                    inputPlaceholder="Type Publish Date."
                    {...register("publishDate", {
                      required: "Publish Date is required.",
                      pattern: {
                        value: /^\d{4}$/,
                      },
                    })}
                  />
                </div>
                <div>
                  {errors.publishDate && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.publishDate.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="w-full">
                  <UploaderComp
                    {...register("bookImage", {
                      required: "Image is required.",
                    })}
                  />
                </div>
                <div>
                  {errors.bookImage && (
                    <Typography color="red" className="text-sm font-medium">
                      {errors.bookImage.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <ButtonComp btnClick={handleOpen} classes="mr-1" title="Cancel" />
              <ButtonComp
                classes="ml-1"
                btnType="submit"
                title="Save"
                btnClick={handleSubmit(addBook)}
              />
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AddBookModalComp;
