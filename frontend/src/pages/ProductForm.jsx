import { useState } from 'react'


export default function ProductForm({ initialValues, providers, onSubmit, onCancel, error }) {
    const [values, setValues] = useState({
        name: initialValues?.name || '',
        description: initialValues?.description || '',
        price: initialValues?.price ?? '',
        stock: initialValues?.stock ?? '',
        providerId: initialValues?.providerId ?? ''
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
        description: values.description.trim(),
        price: Number(values.price),
        stock: values.stock === '' ? undefined : Number(values.stock),
        providerId: values.providerId === '' ? undefined : Number(values.providerId)
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
            <label className="form-label">Descripción</label>
            <textarea
            className="form-control"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={2}
            />
        </div>
        <div className="row">
            <div className="col-6 mb-3">
            <label className="form-label">Precio</label>
            <input
                type="number"
                step="0.01"
                min="0.01"
                className="form-control"
                name="price"
                value={values.price}
                onChange={handleChange}
                required
            />
            </div>
            <div className="col-6 mb-3">
            <label className="form-label">Stock</label>
            <input
                type="number"
                min="0"
                className="form-control"
                name="stock"
                value={values.stock}
                onChange={handleChange}
            />
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Proveedor</label>
            <select
            className="form-select"
            name="providerId"
            value={values.providerId}
            onChange={handleChange}
            >
            <option value="">Sin proveedor</option>
            {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
            ))}
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