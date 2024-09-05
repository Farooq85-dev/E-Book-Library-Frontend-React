import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { SlMenu } from "react-icons/sl";
import InputComp from "../Input/Input";
import ButtonComp from "../Button/Button";
import AddBookModalComp from "../AddBookModal/AddBookModal";

function NavbarComp() {
  const [openNav, setOpenNav] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Typography
            as="a"
            href="#"
            className="cursor-pointer py-1.5 font-medium text-2xl text-gray-900"
          >
            E-Library
          </Typography>
          <div className="hidden lg:flex items-center gap-x-2">
            <InputComp type="search" placeholder="Search" />
            <ButtonComp title="Search" />
            <ButtonComp title="Add Book" btnClick={handleOpen} />
          </div>

          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            <SlMenu className="h-6 w-6" strokeWidth={2} />
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto flex flex-col-reverse justify-center items-center">
          <div className="flex flex-col gap-x-2 mt-4 sm:flex-col sm:justify-center sm:items-center sm:gap-4 w-full lg:hidden">
            <div className="w-full">
              <InputComp inputType="search" inputPlaceholder="Search" />
            </div>
            <div className="w-full">
              <ButtonComp title="Search" classes="mt-4 sm:mt-0" />
            </div>
            <div className="w-full" >
              <ButtonComp
                title="Add Book"
                btnClick={handleOpen}
                classes="mt-4 sm:mt-0"
              />
            </div>
          </div>
        </div>
      </Collapse>
      <AddBookModalComp open={open} handleOpen={handleOpen} />
    </Navbar>
  );
}

export default NavbarComp;
