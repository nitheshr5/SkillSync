// src/pages/Profile.jsx
import { useEffect, useState } from 'react'
import { getUserDetails } from '../services/api'

function Profile() {
  const userId = 1 // Replace this with actual logged-in user ID
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(userId)
        setUser(data)
      } catch (err) {
        console.error('Failed to load user:', err)
      }
    }
    fetchUser()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Bio:</strong> {user.bio || 'N/A'}</div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <ul className="list-disc ml-6">
          {user.skills?.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <ul className="list-disc ml-6">
          {user.projects?.map((proj) => (
            <li key={proj.id}>
              {proj.name} - <a className="text-blue-600 underline" href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile
