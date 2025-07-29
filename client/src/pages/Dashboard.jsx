// src/pages/Dashboard.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Profile from './Profile'
import JobTracker from './JobTracker'
import FileUploader from '../components/FileUploader'
import AnalyticsDashboard from '../components/AnalyticsDashboard'
import Settings from './Settings'

function Dashboard() {
  return (
    <Layout>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<JobTracker />} />
        <Route path="upload" element={<FileUploader />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default Dashboard
