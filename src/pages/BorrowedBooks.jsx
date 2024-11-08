import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchBorrowedBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/book/borrowedBooks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: `Bearer ${user.token}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.ok) {
        const books = await response.json()
        console.log(books)
        setBorrowedBooks(books)
      } else {
        console.log('Failed to fetch borrowed books')
      }
    } catch (err) {
      console.error('Error fetching borrowed books:', err)
    } finally {
      setLoading(false)
    }
  }

  const returnBook = async (bookId) => {
    console.log('return function is called')
    try {
      const response = await fetch(`http://localhost:5000/book/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ available: true }),
      })
      console.log(response)

      if (response.ok) {
        fetchBorrowedBooks()
      } else {
        console.log('Failed to return book')
      }
    } catch (err) {
      console.error('Error returning book:', err)
    }
  }

  useEffect(() => {
    fetchBorrowedBooks()
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-center">Borrowed Books</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {borrowedBooks.length === 0 ? (
              <p className="text-center text-red-500">
                No borrowed books found
              </p>
            ) : (
              borrowedBooks.map((book) => (
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
                    </div>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-20 h-30 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => returnBook(book._id)}
                      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                    >
                      Return Book
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BorrowedBooks
