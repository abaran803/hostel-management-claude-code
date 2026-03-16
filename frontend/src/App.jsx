import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Students from './pages/Students'
import Bookings from './pages/Bookings'
import Login from './pages/Login'
import Register from './pages/Register'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/rooms', label: 'Rooms', icon: '🏠' },
  { to: '/students', label: 'Students', icon: '👤' },
  { to: '/bookings', label: 'Bookings', icon: '📋' },
]

function ProtectedLayout() {
  const { user, logout } = useAuth()
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">Hostel <span>Manager</span></div>
        <nav>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">👤 {user.name}</div>
          <button className="btn-logout" onClick={logout}>Sign Out</button>
        </div>
      </aside>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<><div className="topbar">Dashboard</div><div className="content"><Dashboard /></div></>} />
          <Route path="/rooms" element={<><div className="topbar">Rooms</div><div className="content"><Rooms /></div></>} />
          <Route path="/students" element={<><div className="topbar">Students</div><div className="content"><Students /></div></>} />
          <Route path="/bookings" element={<><div className="topbar">Bookings</div><div className="content"><Bookings /></div></>} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<LoginRoute isRegister />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function LoginRoute({ isRegister }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return isRegister ? <Register /> : <Login />
}
