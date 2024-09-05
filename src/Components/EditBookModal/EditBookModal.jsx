import React, { useEffect } from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    // Conditionally set the form data
    let data = new FormData();
    data.append("title", editBookData.title || selectedBookTitle);
    data.append("author", editBookData.author || selectedBookAuthor);
    data.append(
      "description",
      editBookData.description || selectedBookDescription
    );
    data.append("price", editBookData.price || selectedBookPrice);
    data.append(
      "publishDate",
      editBookData.publishDate || selectedBookPublishDate
    );

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/updateBook/${bookId}`,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Your book has been updated successfully!");
        reset();
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Please try again!");
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
                  },
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <ButtonComp btnClick={handleOpen} classes="mr-1" title="Cancel" />
            <ButtonComp
              classes="ml-1"
              btnType="submit"
              title="Save"
              btnClick={handleSubmit(editBook)}
            />
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default EditBookModal;
