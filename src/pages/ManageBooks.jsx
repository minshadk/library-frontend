import { useState, useEffect } from 'react'

const ManageBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/book')
      const books = await response.json()
      console.log(books)
      setBooks(books)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching loaned books:', err)
      setLoading(false)
    }
  }

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: true }),
      })

      if (response.ok) {
        fetchBooks()
      } else {
        console.log('Failed to return book')
      }
    } catch (err) {
      console.error('Error returning book:', err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4">
        <h1 className="text-3xl font-extrabold text-center">Books</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {books.length === 0 ? (
              <p className="text-center text-red-500">No books found</p>
            ) : (
              books.map((book) => (
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
                  </div>
                  <div className="flex-grow ml-10">
                    <h3 className="text-lg font-semibold">Owner Details</h3>
                    <p className="text-gray-600">{book.bookOwnerId?.userName}</p>
                    <p className="text-gray-500">{book.bookOwnerId?.phoneNumber}</p>
                  </div>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageBooks
