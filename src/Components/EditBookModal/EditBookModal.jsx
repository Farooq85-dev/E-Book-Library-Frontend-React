import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import ButtonComp from "../Button/Button";
import InputComp from "../Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditBookModal({
  open,
  handleOpen,
  bookId,
  selectedBookTitle,
  selectedBookAuthor,
  selectedBookDescription,
  selectedBookPrice,
  selectedBookPublishDate,
}) {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);

  // Reset form values when modal opens with selected book data
  useEffect(() => {
    if (open) {
      reset({
        title: selectedBookTitle,
        author: selectedBookAuthor,
        description: selectedBookDescription,
        price: selectedBookPrice,
        publishDate: selectedBookPublishDate,
      });
    }
  }, [
    open,
    selectedBookTitle,
    selectedBookAuthor,
    selectedBookDescription,
    selectedBookPrice,
    selectedBookPublishDate,
    reset,
  ]);

  const editBook = (editBookData) => {
    setUpdating(true);
    const data = {
      title: editBookData.title || selectedBookTitle,
      author: editBookData.author || selectedBookAuthor,
      description: editBookData.description || selectedBookDescription,
      price: editBookData.price || selectedBookPrice,
      publishDate: editBookData.publishDate || selectedBookPublishDate,
    };

    let config = {
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/updateBook/${bookId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        toast.error(
          response?.data?.message || "Book data updated Successfully!"
        );
        reset();
        handleOpen();
        navigate("/library");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Please try again!");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Edit Book</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(editBook)}>
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="w-full">
              <InputComp
                inputType="text"
                inputPlaceholder="Type Title."
                {...register("title")}
              />
            </div>
            <div className="w-full">
              <InputComp
                inputType="text"
                inputPlaceholder="Type Author."
                {...register("author")}
              />
            </div>
            <div className="w-full">
              <InputComp
                inputType="text"
                inputPlaceholder="Type Description."
                {...register("description")}
              />
            </div>
            <div className="w-full">
              <InputComp
                inputType="number"
                inputPlaceholder="Type Price."
                {...register("price")}
              />
            </div>
            <div className="w-full">
              <InputComp
                inputType="text"
                inputPlaceholder="Type Publish Date."
                {...register("publishDate", {
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Please type a valid year.",
                  },
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <ButtonComp btnClick={handleOpen} classes="mr-1" title="Cancel" />
            <ButtonComp
              classes="ml-1"
              btnDisable={updating ? "disable" : null}
              btnType="submit"
              title={
                updating ? (
                  <>
                    saving
                    <Spinner className="w-4 h-4" color="white" />
                  </>
                ) : (
                  "Save"
                )
              }
            />
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default EditBookModal;
