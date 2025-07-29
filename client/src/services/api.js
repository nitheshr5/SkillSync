// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

// 👤 User APIs
export const getUserDetails = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/users/${id}`)
  return res.data
}

export const getUserById = getUserDetails // alias for clarity if needed

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/users/${id}`, data)
  return res.data
}

// 🧠 Auth APIs
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export const loginUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

// 📁 File APIs
export const uploadFile = async (userId, formData) => {
  const res = await axios.post(`${API_BASE_URL}/files/upload/${userId}`, formData)
  return res.data
}

export const getFiles = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/files/user/${userId}`)
  return res.data
}

export const deleteFile = async (fileId) => {
  const res = await axios.delete(`${API_BASE_URL}/files/${fileId}`)
  return res.data
}

export const getFileStats = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/files/stats/${userId}`)
  return res.data
}

// 💼 Job APIs
export const createJob = async (userId, jobData) => {
  const res = await axios.post(`${API_BASE_URL}/jobs`, {
    ...jobData,
    userId,
  })
  return res.data
}

export const getJobs = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/jobs/user/${userId}`)
  return res.data
}

export const updateJob = async (jobId, data) => {
  const res = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, data)
  return res.data
}

export const deleteJob = async (jobId) => {
  const res = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`)
  return res.data
}

export const getJobStats = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/jobs/stats/${userId}`)
  return res.data
}
