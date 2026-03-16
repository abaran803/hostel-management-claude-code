import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [students, setStudents] = useState([])
  const [rooms, setRooms] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ student: '', room: '', checkIn: '', totalAmount: '' })
  const [error, setError] = useState('')

  const load = () => Promise.all([
    axios.get('/api/bookings').then(r => setBookings(r.data)),
    axios.get('/api/students').then(r => setStudents(r.data)),
    axios.get('/api/rooms').then(r => setRooms(r.data)),
  ])

  useEffect(() => { load() }, [])

  const save = async () => {
    try {
      await axios.post('/api/bookings', form)
      setModal(false)
      setForm({ student: '', room: '', checkIn: '', totalAmount: '' })
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Error creating booking')
    }
  }

  const checkout = async (id) => {
    if (!confirm('Check out this student?')) return
    await axios.put(`/api/bookings/${id}/checkout`)
    load()
  }

  const del = async (id) => {
    if (!confirm('Delete this booking?')) return
    await axios.delete(`/api/bookings/${id}`)
    load()
  }

  const statusBadge = (s) => {
    const map = { active: 'badge-green', 'checked-out': 'badge-blue', cancelled: 'badge-red' }
    return <span className={`badge ${map[s]}`}>{s}</span>
  }

  const availableRooms = rooms.filter(r => r.status === 'available')

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>All Bookings</h2>
          <button className="btn btn-primary" onClick={() => { setError(''); setModal(true) }}>+ New Booking</button>
        </div>
        <table>
          <thead>
            <tr><th>Student</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Amount</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td><strong>{b.student?.name}</strong><br /><small style={{color:'#94a3b8'}}>{b.student?.studentId}</small></td>
                <td>Room {b.room?.roomNumber}</td>
                <td>{new Date(b.checkIn).toLocaleDateString()}</td>
                <td>{b.checkOut ? new Date(b.checkOut).toLocaleDateString() : '-'}</td>
                <td>{statusBadge(b.status)}</td>
                <td>{b.totalAmount ? `₦${b.totalAmount.toLocaleString()}` : '-'}</td>
                <td>
                  {b.status === 'active' && (
                    <button className="btn btn-sm btn-success" style={{marginRight:8}} onClick={() => checkout(b._id)}>Check Out</button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={() => del(b._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && <tr><td colSpan={7} style={{textAlign:'center',color:'#94a3b8',padding:'32px'}}>No bookings yet</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>New Booking</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>Student</label>
              <select value={form.student} onChange={e => setForm({ ...form, student: e.target.value })}>
                <option value="">Select student</option>
                {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.studentId})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Room (Available only)</label>
              <select value={form.room} onChange={e => setForm({ ...form, room: e.target.value })}>
                <option value="">Select room</option>
                {availableRooms.map(r => <option key={r._id} value={r._id}>Room {r.roomNumber} - {r.type} (₦{r.price}/mo)</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Check-In Date</label>
              <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Total Amount (₦)</label>
              <input type="number" value={form.totalAmount} onChange={e => setForm({ ...form, totalAmount: e.target.value })} />
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Book Room</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
