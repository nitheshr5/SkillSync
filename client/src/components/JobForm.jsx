// src/components/JobForm.jsx
import { useState } from 'react'
import { createJob } from '../services/api'

function JobForm({ userId, onJobAdded }) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    date: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createJob(userId, form)
      onJobAdded() // reload jobs
      setForm({ title: '', company: '', status: 'Applied', date: '' })
    } catch (err) {
      console.error('Error creating job:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <div className="flex gap-4">
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Job
      </button>
    </form>
  )
}

export default JobForm
