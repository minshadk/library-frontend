import { useState, useEffect } from 'react'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/user')
      const allUsers = await response.json()
      
      // Filter out admin users
      const nonAdminUsers = allUsers.filter(user => user.userType !== 'admin')
      setUsers(nonAdminUsers)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching users:', err)
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        fetchUsers() // Refresh the user list after deletion
      } else {
        console.log('Failed to delete user')
      }
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-extrabold text-center">Manage Users</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {users.length === 0 ? (
              <p className="text-center text-red-500">No users found</p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full max-w-4xl"
                  style={{ width: '100%' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{user.userName}</h3>
                      <p className="text-gray-600">{user.phoneNumber}</p>
                    </div>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                    >
                      Delete
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

export default ManageUsers
