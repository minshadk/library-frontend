import { useState, useEffect } from "react";
import TextInput from "../components/Inputs/TextInput";
import { Link } from "react-router-dom";

const BrowseBooks = () => {
  const [title, setTitle] = useState(""); 
  const [books, setBooks] = useState([]); 
  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [noResults, setNoResults] = useState(false); 

  const getBooks = async () => {
    setLoading(true); 
    try {
      const response = await fetch("http://localhost:5000/book");
      const books = await response.json();
      setBooks(books);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (title.trim() === "") {
      setFilteredBooks(books); 
      return;
    }

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredBooks(filtered);

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex-1 w-64">
              <TextInput
                placeHolder={"Title"}
                type={"text"}
                textValue={title}
                setText={setTitle}
              />
            </div>

            <button
              type="submit"
              className="flex-1 w-3 group relative max-w-[30%] ml-5 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSearch}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Search Book
            </button>
          </div>
        </div>

        {loading && <p className="text-center">Loading books...</p>}

        {noResults && !loading && (
          <p className="text-center text-red-500">No books found</p>
        )}

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {(filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
            <Link
              key={book._id}
              to={`/bookDetails/${book._id}`}
              className="group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {book.rating}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
