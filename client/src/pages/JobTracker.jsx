// src/pages/JobTracker.jsx
import { useEffect, useState } from 'react'
import {
  createJob,
  getJobs,
  deleteJob,
  updateJob
} from '../services/api'
import { useAuth } from '../hooks/useAuth'

function JobTracker() {
  const { user } = useAuth()
  const userId = user?.id

  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date: '',
    notes: ''
  })

  const [jobs, setJobs] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await getJobs(userId)
      setJobs(res)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch jobs')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) fetchJobs()
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateJob(editingId, form)
      } else {
        await createJob(userId, form)
      }
      setForm({ company: '', position: '', status: 'Applied', date: '', notes: '' })
      setEditingId(null)
      fetchJobs()
    } catch (err) {
      console.error('Job submission failed:', err)
    }
  }

  const handleEdit = (job) => {
    setEditingId(job.id)
    setForm(job)
  }

  const handleDelete = async (id) => {
    await deleteJob(id)
    fetchJobs()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Job' : 'Add Job'}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="border p-2 rounded" required />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="border p-2 rounded" required />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="col-span-2 border p-2 rounded" rows="2" />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          {editingId ? 'Update' : 'Add'} Job
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Your Jobs</h3>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs added yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="border rounded p-4 shadow-sm flex justify-between items-start">
                <div>
                  <p className="font-bold">{job.position} @ {job.company}</p>
                  <p className="text-sm">Status: <span className="font-medium">{job.status}</span> | Date: {job.date || 'N/A'}</p>
                  {job.notes && <p className="text-sm text-gray-600 mt-1">Notes: {job.notes}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(job)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default JobTracker
