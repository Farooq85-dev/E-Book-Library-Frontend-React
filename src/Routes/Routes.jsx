import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import AccountPage from "../Pages/Account/Account";
import LibraryPage from "../Pages/Library/Library";

function RoutesComp() {
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
