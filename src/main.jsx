import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { BookProvider } from "./Context/Book.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BookProvider>
        <App />
      </BookProvider>
    </ThemeProvider>
  </StrictMode>
);
