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

function NavbarComp() {
  const [openNav, setOpenNav] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8">
      {["Sales", "New In", "Blocks", "Docs"].map((item) => (
        <Typography
          key={item}
          as="li"
          variant="small"
          className="font-medium text-gray-900 transition-all duration-300 text-xl"
        >
          <a href="#" className="flex items-center">
            {item}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="mx-auto rounded-none max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4 bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Typography
            as="a"
            href="#"
            className="cursor-pointer py-1.5 font-medium text-2xl text-gray-900"
          >
            E-Book
          </Typography>
          <div className="hidden lg:flex items-center gap-x-2">
            <InputComp type="search" placeholder="Search" />
            <ButtonComp title="Search" />
          </div>

          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            <SlMenu className="h-6 w-6" strokeWidth={2} />
          </IconButton>
        </div>
        <hr className="hidden lg:block mt-4" />
        <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center mt-4">
          {navList}
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto flex flex-col-reverse justify-center items-center">
          <div className="flex flex-col gap-x-2 mt-4 sm:flex-row sm:justify-center sm:items-center w-full lg:hidden">
            <InputComp inputType="search" inputPlaceholder="Search" />
            <ButtonComp title="Search" classes="mt-4 sm:mt-0" />
          </div>
          <div className="mt-4">{navList}</div>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarComp;
