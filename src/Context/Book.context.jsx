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
  const [page, setPage] = useState(1);

  // Function to fetch books
  const fetchBooks = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/getBook?page=${page}`,
        headers: {},
      };

      const response = await axios.request(config);

      setBooks((prevBooks) => {
        if (prevBooks.foundedBook && prevBooks.foundedBook.length > 0) {
          const newBooks = response.data.foundedBook.filter(
            (newBook) =>
              !prevBooks.foundedBook.some(
                (prevBook) => prevBook._id === newBook._id
              )
          );
          return {
            ...response.data,
            foundedBook: [...prevBooks.foundedBook, ...newBooks],
          };
        } else {
          return response.data;
        }
      });
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <BookContext.Provider value={{ books, loading, error, setPage }}>
      {children}
    </BookContext.Provider>
  );
};

export { useBookContext, BookProvider };
