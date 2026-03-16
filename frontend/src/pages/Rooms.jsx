import { useState, useEffect } from 'react'
import axios from 'axios'

const EMPTY = { roomNumber: '', type: 'single', capacity: 1, price: '', floor: 1, amenities: '', status: 'available' }

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const load = () => axios.get('/api/rooms').then(r => setRooms(r.data))

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY); setEditing(null); setError(''); setModal(true) }
  const openEdit = (room) => {
    setForm({ ...room, amenities: room.amenities.join(', ') })
    setEditing(room._id)
    setError('')
    setModal(true)
  }

  const save = async () => {
    try {
      const data = { ...form, amenities: form.amenities ? form.amenities.split(',').map(s => s.trim()) : [] }
      if (editing) await axios.put(`/api/rooms/${editing}`, data)
      else await axios.post('/api/rooms', data)
      setModal(false)
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Error saving room')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this room?')) return
    await axios.delete(`/api/rooms/${id}`)
    load()
  }

  const statusBadge = (s) => {
    const map = { available: 'badge-green', occupied: 'badge-red', maintenance: 'badge-yellow' }
    return <span className={`badge ${map[s]}`}>{s}</span>
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>All Rooms</h2>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Room</button>
        </div>
        <table>
          <thead>
            <tr><th>Room No.</th><th>Type</th><th>Floor</th><th>Capacity</th><th>Price/mo</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r._id}>
                <td><strong>{r.roomNumber}</strong></td>
                <td style={{textTransform:'capitalize'}}>{r.type}</td>
                <td>{r.floor}</td>
                <td>{r.capacity}</td>
                <td>₦{r.price.toLocaleString()}</td>
                <td>{statusBadge(r.status)}</td>
                <td>
                  <button className="btn btn-sm btn-primary" style={{marginRight:8}} onClick={() => openEdit(r)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => del(r._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && <tr><td colSpan={7} style={{textAlign:'center',color:'#94a3b8',padding:'32px'}}>No rooms yet</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editing ? 'Edit Room' : 'Add Room'}</h2>
            {error && <div className="error">{error}</div>}
            {[
              { label: 'Room Number', key: 'roomNumber' },
              { label: 'Floor', key: 'floor', type: 'number' },
              { label: 'Capacity', key: 'capacity', type: 'number' },
              { label: 'Price per Month (₦)', key: 'price', type: 'number' },
              { label: 'Amenities (comma-separated)', key: 'amenities' },
            ].map(f => (
              <div className="form-group" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type || 'text'} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
