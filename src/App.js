import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './layout/Layout'
import AdminLayout from './layout/AdminLayout'

import AddBook from './pages/AddBook'
import LoanedBooks from './pages/LoanedBooks'

import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BrowseBooks from './pages/BrowseBooks'
import { useAuthContext } from './hooks/useAuthContext'

// Component to protect admin routes
const AdminRoute = ({ element }) => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.userType !== 'admin') {
    return <Navigate to="/" />
  }

  return element
}

function App() {
  const { user } = useAuthContext()
  console.log(user)

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/:bookId" element={<BookDetails />} />
          <Route path="/bookDetails/:bookId" element={<BookDetails />} />
          <Route path="/browseBook" element={<BrowseBooks />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/signUp" element={<SignUp />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/home"
            element={<AdminRoute element={<Home />} />}
          />
          <Route
            path="/admin/addBook" 
            element={<AdminRoute element={<AddBook />} />}
          />
          <Route
            path="/admin/loanedBooks" 
            element={<AdminRoute element={<LoanedBooks />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
