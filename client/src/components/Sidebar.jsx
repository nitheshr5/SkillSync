// src/components/Sidebar.jsx
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-full p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
        <li><Link to="/profile" className="text-blue-600 hover:underline">Profile</Link></li>
        <li><Link to="/job-tracker" className="text-blue-600 hover:underline">Job Tracker</Link></li>
        <li><Link to="/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
        <li><Link to="/upload" className="text-blue-600 hover:underline">File Upload</Link></li>
      </ul>
    </div>
  )
}
