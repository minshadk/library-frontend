import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'

import Layout from './layout/Layout'
import AdminLayout from './layout/AdminLayout'

import AddBook from './pages/AddBook'
import LoanedBooks from './pages/LoanedBooks'

import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BrowseBooks from './pages/BrowseBooks'
import BorrowedBooks from './pages/BorrowedBooks'
import ManageBooks from './pages/ManageBooks'
import ManageUsers from './pages/ManageUsers'
import OwnedBooks from './pages/OwnedBooks'

import { useAuthContext } from './hooks/useAuthContext'

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
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/borrowedBooks" element={<BorrowedBooks />} />
          <Route path="/ownedBooks" element={<OwnedBooks />} />
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
            path="/admin/loanedBooks"
            element={<AdminRoute element={<LoanedBooks />} />}
          />
          <Route
            path="/admin/manageBooks"
            element={<AdminRoute element={<ManageBooks />} />}
          />
          <Route
            path="/admin/manageUsers"
            element={<AdminRoute element={<ManageUsers />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
