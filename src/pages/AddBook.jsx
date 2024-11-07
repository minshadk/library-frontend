import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DropDown from '../components/Inputs/DropDown'
import TextArea from '../components/Inputs/TextArea'
import TextInput from '../components/Inputs/TextInput'
import YearPicker from '../components/Inputs/YearPicker'

const AddBook = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [coverUrl, setImageUrl] = useState(null)
  const [description, setDescription] = useState(null)
  const [genre, setGenre] = useState(null)
  const [language, setLanguage] = useState(null)
  const [year, setYear] = useState(null)

  const [errors, setErrors] = useState({})  // For storing error messages

  const genreOptions = [
    'Autography',
    'Fiction',
    'Novel',
    'Narrative',
    'Science fiction',
    'Mystery',
    'Genre fiction',
    'Historical Fiction',
    'Non-fiction',
    'Fantasy Fiction',
    'Fairy Tale',
  ]

  const languageOptions = [
    'English',
    'Hindi',
    'Malayalam',
    'Arabic',
    'Spanish',
    'Tamil',
    'French',
  ]

  const handleFormSubmit = async () => {
    // Clear previous errors
    setErrors({})

    // Form validation
    let formIsValid = true
    const newErrors = {}

    // Validate required fields
    if (!title) {
      newErrors.title = 'Title is required'
      formIsValid = false
    }
    if (!author) {
      newErrors.author = 'Author is required'
      formIsValid = false
    }
    if (!isbn) {
      newErrors.isbn = 'ISBN is required'
      formIsValid = false
    }
    if (!coverUrl) {
      newErrors.coverUrl = 'Cover URL is required'
      formIsValid = false
    }
    if (!genre) {
      newErrors.genre = 'Genre is required'
      formIsValid = false
    }
    if (!language) {
      newErrors.language = 'Language is required'
      formIsValid = false
    }
    if (!year) {
      newErrors.year = 'Year is required'
      formIsValid = false
    }
    if (!description) {
      newErrors.description = 'Summary is required'
      formIsValid = false
    }

    // If validation fails, update errors and return
    if (!formIsValid) {
      setErrors(newErrors)
      return
    }

    // If validation passes, send data to the server
    const bookDetails = {
      title,
      author,
      isbn,
      coverUrl,
      description,
      genre,
      language,
      year,
    }

    const response = await fetch('/book', {
      method: 'POST',
      body: JSON.stringify(bookDetails),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    console.log(json)
    if (response.ok) navigate(-1)
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add new Book
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              placeHolder={'Title'}
              type={'text'}
              textValue={title}
              setText={setTitle}
              error={errors.title}  
            />
            <TextInput
              placeHolder={'Author'}
              type={'text'}
              textValue={author}
              setText={setAuthor}
              error={errors.author}  
            />
            <TextInput
              placeHolder={'Isbn'}
              type={'number'}
              textValue={isbn}
              setText={setIsbn}
              error={errors.isbn}  
            />
            <TextInput
              placeHolder={'Image Url'}
              type={'text'}
              textValue={coverUrl}
              setText={setImageUrl}
              error={errors.coverUrl}  
            />
            <TextInput
              placeHolder={'Year'}
              type={'number'}
              textValue={year}
              setText={setYear}
              error={errors.year}  
            />
            <DropDown
              label={'Genre'}
              setOption={setGenre}
              options={genreOptions}
              error={errors.genre}  
            />
            <DropDown
              label={'Language'}
              setOption={setLanguage}
              options={languageOptions}
              error={errors.language}  
            />
            <YearPicker />
            <TextArea
              label="Summary"
              placeHolder={'Summary'}
              textValue={description}
              setText={setDescription}
              error={errors.description}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleFormSubmit}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Add book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBook
