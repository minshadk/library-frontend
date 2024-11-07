import { useState, useEffect } from 'react'

const LoanedBooks = () => {
  const [loanedBooks, setLoanedBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchLoanedBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/book')
      const books = await response.json()
      setLoanedBooks(books.filter((book) => !book.available))
      setLoading(false)
    } catch (err) {
      console.error('Error fetching loaned books:', err)
      setLoading(false)
    }
  }

  const returnBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/book/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: true }),
      })

      if (response.ok) {
        fetchLoanedBooks()
      } else {
        console.log('Failed to return book')
      }
    } catch (err) {
      console.error('Error returning book:', err)
    }
  }

  useEffect(() => {
    fetchLoanedBooks()
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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

export default LoanedBooks
