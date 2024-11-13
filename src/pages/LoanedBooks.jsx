import { useState, useEffect } from 'react';

const LoanedBooks = () => {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLoanedBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/book');
      const books = await response.json();
      setLoanedBooks(books.filter((book) => !book.available));
    } catch (err) {
      console.error('Error fetching loaned books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanedBooks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4">
        <h1 className="text-3xl font-extrabold text-center">Loaned Books</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {loanedBooks.length === 0 ? (
              <p className="text-center text-red-500">No loaned books found</p>
            ) : (
              loanedBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full flex items-center space-x-6"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-600">{book.author}</p>
                    <p className="text-gray-500">{book.genre}</p>
                    <p className="text-gray-400">{book.language}</p>
                    {book.pickedDate && (
                      <p className="text-gray-500 mt-2">
                        Picked Date: {formatDate(book.pickedDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">Borrowed User</h3>
                    <p className="text-gray-600">{book.borrowedUserId?.userName}</p>
                    <p className="text-gray-500">{book.borrowedUserId?.phoneNumber}</p>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">Owner Details</h3>
                    <p className="text-gray-600">{book.bookOwnerId?.userName}</p>
                    <p className="text-gray-500">{book.bookOwnerId?.phoneNumber}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanedBooks;
