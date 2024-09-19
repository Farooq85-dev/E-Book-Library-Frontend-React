import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a context
const BookContext = createContext();
const useBookContext = () => useContext(BookContext);

// Create a provider component
const BookProvider = ({ children }) => {
  const [books, setBooks] = useState({ foundedBook: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch books
  const fetchBooks = async () => {
    setLoading(true); // Set loading to true at the start
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/getBook?page=${page}`
      );

      setBooks((prevBooks) => {
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
      });
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err);
      console.error("---- Error fetching books ----");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <BookContext.Provider
      value={{ books, loading, error, setPage, totalPages, page }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { useBookContext, BookProvider };
