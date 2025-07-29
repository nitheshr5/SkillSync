import { useEffect, useState } from 'react'
import { getUserById, updateUser } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-hot-toast'

const ProfileForm = () => {
  const { currentUser } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  })

  const [loading, setLoading] = useState(false)

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(currentUser.id)
        setFormData({
          name: data.name || '',
          email: data.email || '',
          bio: data.bio || '',
        })
      } catch (err) {
        toast.error('Failed to fetch user details')
      }
    }

    if (currentUser?.id) fetchUser()
  }, [currentUser])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateUser(currentUser.id, formData)
      toast.success('Profile updated successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled // email usually shouldn't be editable
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
