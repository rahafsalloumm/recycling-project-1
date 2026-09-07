import { Navigate } from 'react-router-dom'

function getTokenRole(token) {
  try {
    const payload = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decodedPayload?.role
  } catch {
    return null
  }
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token')

  let user = null
  try {
    const savedUser = localStorage.getItem('user')
    user = savedUser ? JSON.parse(savedUser) : null
  } catch {
    localStorage.removeItem('user')
  }

  const normalizedRole = String(user?.role || getTokenRole(token || '') || '').toLowerCase()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.map((role) => String(role).toLowerCase()).includes(normalizedRole)) {
    return <Navigate to="/" replace />
  }

  return children
}
