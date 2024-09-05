import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a context
const BookContext = createContext();
const useBookContext = () => useContext(BookContext);

// Create a provider component
const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/getBook`,
        headers: {},
      };

      const response = await axios.request(config);
      setBooks(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, loading, error }}>
      {children}
    </BookContext.Provider>
  );
};

export { useBookContext, BookProvider };
