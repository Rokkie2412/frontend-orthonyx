import React from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom'

const NotFound = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate()

  const handleBack = () => navigate('/', { replace: true })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleBack}
        className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </button>
    </div>
  )
}

export default NotFound
