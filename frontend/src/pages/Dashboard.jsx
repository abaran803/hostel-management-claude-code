import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    axios.get('/api/bookings/stats/summary').then(r => setStats(r.data))
  }, [])

  if (!stats) return <div className="loading">Loading...</div>

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="label">Total Rooms</div>
          <div className="value">{stats.totalRooms}</div>
        </div>
        <div className="stat-card green">
          <div className="label">Available Rooms</div>
          <div className="value">{stats.availableRooms}</div>
        </div>
        <div className="stat-card red">
          <div className="label">Occupied Rooms</div>
          <div className="value">{stats.occupiedRooms}</div>
        </div>
        <div className="stat-card purple">
          <div className="label">Total Students</div>
          <div className="value">{stats.totalStudents}</div>
        </div>
        <div className="stat-card blue">
          <div className="label">Active Bookings</div>
          <div className="value">{stats.activeBookings}</div>
        </div>
      </div>
    </>
  )
}
