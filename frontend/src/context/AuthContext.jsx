import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })

  const token = localStorage.getItem('token')

  // Attach token to every axios request
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  function login(userData, tokenValue) {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenValue)
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
