import CardComp from "../../Components/LibraryCard/Card";
import NavbarComp from "./../../Components/Navbar/Navbar";

function LibraryPage() {
  return (
    <div className="ml-10 mr-10 mb-10 2xl:ml-0 2xl:mr-0">
      <NavbarComp />
      <CardComp />
    </div>
  );
}

export default LibraryPage;
