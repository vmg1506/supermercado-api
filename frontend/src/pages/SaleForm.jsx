import { useState } from 'react'

const emptyItem = () => ({ productId: '', quantity: 1 })

export default function SaleForm({ users, products, onSubmit, onCancel, error }) {
    const [userId, setUserId] = useState('')
    const [items, setItems] = useState([emptyItem()])
    const [submitting, setSubmitting] = useState(false)
    const updateItem = (index, field, value) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
    }

    const addItem = () => setItems((prev) => [...prev, emptyItem()])
    const removeItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index))
    }

    const findProduct = (productId) => products.find((p) => String(p.id) === String(productId))
    const estimatedTotal = items.reduce((sum, item) => {
        const product = findProduct(item.productId)
        if (!product || !item.quantity) return sum
        return sum + Number(product.price) * Number(item.quantity)
    }, 0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        await onSubmit({
        userId: Number(userId),
        items: items
            .filter((item) => item.productId !== '')
            .map((item) => ({ productId: Number(item.productId), quantity: Number(item.quantity) }))
        })
        setSubmitting(false)
    }
    
    return (
        <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="mb-3">
            <label className="form-label">Usuario</label>
            <select
            className="form-select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            >
            <option value="">Selecciona un usuario</option>
            {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
            </select>
        </div>
        <label className="form-label">Productos</label>
        {items.map((item, index) => (
            <div className="row g-2 align-items-center mb-2" key={index}>
            <div className="col-6">
                <select
                className="form-select"
                value={item.productId}
                onChange={(e) => updateItem(index, 'productId', e.target.value)}
                required
                >
                <option value="">Selecciona un producto</option>
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                    {p.name} (stock: {p.stock})
                    </option>
                ))}
                </select>
            </div>
            <div className="col-3">
                <input
                type="number"
                min="1"
                className="form-control"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                required
                />
            </div>
            <div className="col-3">
                <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
                >
                Quitar
                </button>
            </div>
            </div>
        ))}
        <button type="button" className="btn btn-outline-secondary btn-sm mb-3" onClick={addItem}>
            + Agregar producto
        </button>
        <div className="text-end fw-semibold mb-3">
            Total estimado: ${estimatedTotal.toLocaleString('es-CO')}
        </div>
        <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Registrando...' : 'Registrar venta'}
            </button>
        </div>
        </form>
    )
}
