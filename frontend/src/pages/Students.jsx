import { useState, useEffect } from 'react'
import axios from 'axios'

const EMPTY = { name: '', email: '', phone: '', studentId: '', course: '', guardianName: '', guardianPhone: '', address: '' }

export default function Students() {
  const [students, setStudents] = useState([])
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const load = () => axios.get('/api/students').then(r => setStudents(r.data))
  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY); setEditing(null); setError(''); setModal(true) }
  const openEdit = (s) => { setForm(s); setEditing(s._id); setError(''); setModal(true) }

  const save = async () => {
    try {
      if (editing) await axios.put(`/api/students/${editing}`, form)
      else await axios.post('/api/students', form)
      setModal(false)
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Error saving student')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this student?')) return
    await axios.delete(`/api/students/${id}`)
    load()
  }

  const fields = [
    { label: 'Full Name', key: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Student ID', key: 'studentId' },
    { label: 'Course', key: 'course' },
    { label: 'Guardian Name', key: 'guardianName' },
    { label: 'Guardian Phone', key: 'guardianPhone' },
    { label: 'Address', key: 'address' },
  ]

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>All Students</h2>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Student</button>
        </div>
        <table>
          <thead>
            <tr><th>Name</th><th>Student ID</th><th>Email</th><th>Phone</th><th>Course</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td><strong>{s.name}</strong></td>
                <td>{s.studentId}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.course || '-'}</td>
                <td>
                  <button className="btn btn-sm btn-primary" style={{marginRight:8}} onClick={() => openEdit(s)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => del(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={6} style={{textAlign:'center',color:'#94a3b8',padding:'32px'}}>No students yet</td></tr>}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>
            {error && <div className="error">{error}</div>}
            {fields.map(f => (
              <div className="form-group" key={f.key}>
                <label>{f.label}</label>
                <input type={f.type || 'text'} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
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
