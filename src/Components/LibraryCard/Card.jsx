import ButtonComp from "../Button/Button";
import { Typography, Avatar } from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

function CardComp() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl shadow-md p-6 mt-10">
        <div className="booksCard w-full flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <div className="bookImage">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                variant="rounded"
              />
            </div>
            <div className="bookName">
              <Typography
                as="li"
                variant="small"
                className="font-medium text-gray-900 transition-all duration-300 text-xl"
              >
                Bahar-E-Shariat
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="bookEdit">
              <ButtonComp title="Edit" btnIcon={<FiEdit2 size={20} />} />
            </div>
            <div className="bookDelete">
              <ButtonComp
                title="Delete"
                btnIcon={<MdOutlineDelete size={20} />}
              />
            </div>
          </div>
        </div>
        <hr className="mt-6 border border-gray-600" />
      </div>
    </>
  );
}

export default CardComp;
