import { useState } from 'react'

export default function ProviderForm({ initialValues, onSubmit, onCancel, error }) {
    const [values, setValues] = useState({
        name: initialValues?.name || '',
        phone: initialValues?.phone || '',
        email: initialValues?.email || '',
        city: initialValues?.city || ''
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
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim()
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
            <label className="form-label">Teléfono</label>
            <input
            type="text"
            className="form-control"
            name="phone"
            value={values.phone}
            onChange={handleChange}
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
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Ciudad</label>
            <input
            type="text"
            className="form-control"
            name="city"
            value={values.city}
            onChange={handleChange}
            />
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