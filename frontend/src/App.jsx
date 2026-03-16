import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Students from './pages/Students'
import Bookings from './pages/Bookings'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/rooms', label: 'Rooms', icon: '🏠' },
  { to: '/students', label: 'Students', icon: '👤' },
  { to: '/bookings', label: 'Bookings', icon: '📋' },
]

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
