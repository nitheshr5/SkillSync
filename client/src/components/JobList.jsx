// src/components/JobList.jsx
import { useEffect, useState } from 'react'
import { fetchUserJobs, deleteJob } from '../services/api'

function JobList({ userId }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const loadJobs = async () => {
    try {
      const data = await fetchUserJobs(userId)
      setJobs(data)
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      await deleteJob(id)
      setJobs(jobs.filter(job => job.id !== id))
    } catch (err) {
      console.error('Failed to delete job:', err)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  if (loading) return <div>Loading jobs...</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.company}</td>
              <td className="px-4 py-2">{job.status}</td>
              <td className="px-4 py-2">{job.date}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobList
