import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { dispatch } = useAuthContext()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }
  return (
    <nav className="teal-600 border-gray-200 px-2 py-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <NavLink to="/" className="flex no-active">
          <span className="self-center text-lg font-semibold whitespace-nowrap gradient-text">
            📚 Readers Community
          </span>
        </NavLink>
        <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <NavLink
                to="/admin/home"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Home
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="browseBook"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Browse Books
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/admin/loanedBooks"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Loaned Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manageBooks"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Manage Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manageUsers"
                className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              {user && (
                <span className="text-blue-700 font-medium">
                  {user.userName}
                </span>
              )}
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signUp"
                    className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="text-red-700 hover:bg-green-50 border-b border-gray-100 md:hover:bg-red md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
