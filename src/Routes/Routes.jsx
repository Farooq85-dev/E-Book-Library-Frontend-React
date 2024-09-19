import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import AccountPage from "../Pages/Account/Account";
import LibraryPage from "../Pages/Library/Library";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

function RoutesComp() {
  // const [isVerified, setVerified] = useState(null);

  // const verifyUser = async () => {
  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_API_URL}/verifyUser`,
  //     headers: {},
  //     withCredentials: true,
  //   };

  //   await axios
  //     .request(config)
  //     .then((response) => {
  //       setVerified(true);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //       setVerified(false);
  //     });
  // };

  // useEffect(() => {
  //   verifyUser();
  // }, []);

  // if (isVerified === null) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner className="w-20 h-20" color="blue" />
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComp;
