import { Outlet, Navigate } from 'react-router-dom'

import AdminNavbar from '../components/AdminNavbar'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminLayout = () => {
  const { user } = useAuthContext()
  console.log("admin layout")
  console.log(user)
  return (
    <>
      <AdminNavbar />
      <div className=" min-h-full w-full ">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
