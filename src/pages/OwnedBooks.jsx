import { useState, useEffect } from 'react';

const OwnedBooks = () => {
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOwnedBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/book/ownedBooks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const books = await response.json();
        console.log(books)
        setOwnedBooks(books);
      } else {
        console.log('Failed to fetch owned books');
      }
    } catch (err) {
      console.error('Error fetching owned books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnedBooks();
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-center">Owned Books</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {ownedBooks.length === 0 ? (
              <p className="text-center text-red-500">No Owned books found</p>
            ) : (
              ownedBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full max-w-4xl"
                  style={{ width: '100%' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                      <p className="text-gray-500">{book.genre}</p>
                      <p className="text-gray-400">{book.language}</p>
                      {book.available === false && book.borrowedUserId && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-gray-700">Borrowed by:</h4>
                          <p className="text-gray-600">Name: {book.borrowedUserId.userName}</p>
                          <p className="text-gray-600">Phone: {book.borrowedUserId.phoneNumber}</p>
                        </div>
                      )}
                    </div>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-20 h-30 object-cover rounded-lg"
                    />
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

export default OwnedBooks;
