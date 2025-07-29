// src/components/FileUploader.jsx
import { useEffect, useState } from 'react'
import { uploadFile, getFiles, deleteFile } from '../services/api'

function FileUploader() {
  const userId = 1 // Replace with logged-in user ID
  const [selectedFile, setSelectedFile] = useState(null)
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState([])

  const fetchFiles = async () => {
    try {
      const res = await getFiles(userId)
      setFiles(res)
    } catch (err) {
      console.error('Error loading files:', err)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile || !title) return alert('Please add title and file.')

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('title', title)

    try {
      await uploadFile(userId, formData)
      setTitle('')
      setSelectedFile(null)
      fetchFiles()
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId)
      fetchFiles()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload File</h2>

      <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Uploaded Files</h3>
      <ul className="list-disc pl-6 space-y-2">
        {files.map((file) => (
          <li key={file.id} className="flex justify-between items-center">
            <span>{file.title}</span>
            <div className="flex gap-2">
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Download
              </a>
              <button
                onClick={() => handleDelete(file.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileUploader
