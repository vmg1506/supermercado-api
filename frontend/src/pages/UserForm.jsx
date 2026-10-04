import { useState } from 'react'

export default function UserForm({ initialValues, onSubmit, onCancel, error }) {
    const [values, setValues] = useState({
        name: initialValues?.name || '',
        email: initialValues?.email || '',
        role: initialValues?.role || 'client'
    })

    const [submitting, setSubmitting] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role
        })
        setSubmitting(false)
    }
    
    return (
        <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
            type="text"
            className="form-control"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            minLength={2}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input
            type="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Rol</label>
            <select className="form-select" name="role" value={values.role} onChange={handleChange}>
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
            </select>
        </div>
        <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Guardando...' : 'Guardar'}
            </button>
        </div>
        </form>
    )
}