// src/pages/Analytics.jsx
import { useEffect, useState } from 'react'
import { getFileStats, getJobStats } from '../services/api'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ff6666', '#ffcc00']

function Analytics() {
  const userId = 1 // Replace with actual user ID
  const [fileStats, setFileStats] = useState({ total: 0 })
  const [jobStats, setJobStats] = useState({
    total: 0,
    offers: 0,
    rejections: 0,
    interviews: 0,
    applied: 0,
    companies: []
  })

  useEffect(() => {
    const fetchData = async () => {
      const fileRes = await getFileStats(userId)
      const jobRes = await getJobStats(userId)
      setFileStats(fileRes)
      setJobStats(jobRes)
    }
    fetchData()
  }, [])

  const pieData = [
    { name: 'Applied', value: jobStats.applied },
    { name: 'Interview', value: jobStats.interviews },
    { name: 'Offer', value: jobStats.offers },
    { name: 'Rejected', value: jobStats.rejections }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-2">Dashboard Analytics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Files Uploaded" value={fileStats.total} />
        <StatCard label="Jobs Applied" value={jobStats.total} />
        <StatCard label="Offers Received" value={jobStats.offers} />
        <StatCard label="Rejections" value={jobStats.rejections} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Job Status Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Top Companies Applied</h3>
          <BarChart width={400} height={300} data={jobStats.companies}>
            <XAxis dataKey="company" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

export default Analytics
