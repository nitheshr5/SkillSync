// src/pages/Settings.jsx
import { useEffect, useState } from 'react'
import { getUserById, updateUser } from '../services/api'

function Settings() {
  const userId = 1 // Replace with actual user ID from auth
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(userId)
      setFormData({ ...formData, name: user.name, email: user.email })
    }
    fetchUser()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser(userId, formData)
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile.')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="w-full border rounded p-2"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Settings
