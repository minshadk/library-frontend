import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useAuthContext()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <nav className="bg-white border-gray-200 px-2 py-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <NavLink to="/" className="flex no-active">
          <span className="self-center text-lg font-semibold whitespace-nowrap gradient-text">
            📚 Readers Community
          </span>
        </NavLink>

        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-8 md:text-sm md:font-medium">
            <li>
              <NavLink
                to="/"
                activeClassName="active"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="browseBook"
                activeClassName="active"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Browse Books
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signUp"
                    activeClassName="active"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="borrowedBooks"
                    activeClassName="active"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Borrowed Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="addBook"
                    activeClassName="active"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Add Book
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="ownedBooks"
                    activeClassName="active"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Owned Books
                  </NavLink>
                </li>
                <li>
                  {user && (
                    <span className="text-blue-700 font-medium">
                      {user.userName}
                    </span>
                  )}
                </li>
                <li>
                  <button
                    className="text-red-700 hover:bg-green-50 border-b border-gray-100 md:hover:bg-red md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
