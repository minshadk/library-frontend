import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import TextArea from './../components/Inputs/TextArea'

const BookDetails = () => {
  const { bookId } = useParams()
  const { user } = useAuthContext()
  const [book, setBook] = useState(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [commentSuccess, setCommentSuccess] = useState('')

  const handlePickBook = async () => {
    if (!user) {
      alert('Please log in to pick the book.')
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/book/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ available: false, pickedDate: new Date() }),
      })
      const json = await response.json()

      if (json.available !== undefined) {
        setBook((prevBook) => ({ ...prevBook, available: json.available }))
        setSuccessMessage('Book successfully picked!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (err) {
      console.error('Error updating book availability:', err)
    }
  }

  const handleNewComment = async () => {
    if (!user) {
      alert('Please log in to add a comment.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/comment', {
        method: 'POST',
        body: JSON.stringify({
          comment,
          bookId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const json = await response.json()
      console.log(response.status)

      if (response.status === 200) {
        setComments((prevComments) => [...prevComments, json])
        setComment('')
        setCommentSuccess('Comment added successfully!')
        setTimeout(() => setCommentSuccess(''), 3000)
      } else {
        setCommentSuccess('Failed to add comment. Please try again.')
        setTimeout(() => setCommentSuccess(''), 3000)
      }
    } catch (err) {
      console.error('Error adding comment:', err)
      setCommentSuccess('An error occurred. Please try again.')
      setTimeout(() => setCommentSuccess(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`/book/${bookId}`)
        const bookData = await response.json()
        console.log(bookData)
        setBook(bookData)
      } catch (err) {
        console.error('Error fetching book details:', err)
      }
    }

    const getComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/comment/${bookId}`)
        const data = await response.json()
        if (response.status === 200) {
          setComments(data || [])
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    getBook()
    getComments()
  }, [bookId])

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {book?.title}
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={book?.coverUrl}
                className="w-full h-full object-center object-cover"
                alt={`${book?.title} cover`}
              />
            </div>
            <div className="flex justify-between border-b-2">
              <div>
                <span>Book Name: </span> <span>{book?.title}</span>
              </div>
            </div>
            <div className="flex justify-between border-b-2">
              <div>
                <span>Author: </span> <span>{book?.author}</span>
              </div>
              <div>
                <span>Genres: </span> <span>{book?.genre}</span>
              </div>
            </div>
            <div className="flex justify-between border-b-2">
              <div>
                <span>Language: </span> <span>{book?.language}</span>
              </div>
              <div>
                <span>ISBN: </span> <span>{book?.isbn}</span>
              </div>
            </div>
            <div className="flex justify-between border-b-2">
              <div>
                <span>Owner Name: </span>
                <span>{book?.bookOwnerId?.userName}</span>
              </div>
              <div>
                <span>Phone Number: </span>
                <span>{book?.bookOwnerId?.phoneNumber}</span>
              </div>
            </div>
            {successMessage && (
              <div className="mt-4 text-center text-green-600">
                {successMessage}
              </div>
            )}
            <button
              type="button"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                book?.available
                  ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                  : 'text-gray-500 bg-gray-300 cursor-not-allowed'
              }`}
              onClick={handlePickBook}
              disabled={!book?.available}
            >
              {book?.available ? 'Pick Book' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full space-y-8 mx-auto">
        <h1 className="text-2xl">Summary</h1>
        <p>{book?.description}</p>

        {comments.length === 0 ? (
          <p className="text-center text-gray-500">
            No comments available. Be the first to comment
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id}>
              <h1 className="text-1xl">{comment.userId.userName}</h1>
              <p>{comment.comment}</p>
            </div>
          ))
        )}
        <TextArea
          label="Comment"
          placeHolder="Add Your Comment"
          textValue={comment}
          setText={setComment}
        />
        {commentSuccess && (
          <div className="mt-4 text-center text-green-600">
            {commentSuccess}
          </div>
        )}
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mb-11"
          style={{ marginBottom: '200px' }}
          onClick={handleNewComment}
          disabled={isLoading}
        >
          {isLoading ? 'Adding Comment...' : 'Add Comment'}
        </button>
      </div>
    </>
  )
}

export default BookDetails
