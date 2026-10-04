import { useEffect, useState } from 'react'
import { productsApi } from '../api/productsApi'
import { providersApi } from '../api/providersApi'
import { useCrud } from '../hooks/useCrud'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import ProductForm from './ProductForm'

export default function ProductsPage() {

    const { items: products, loading, error, createItem, updateItem, deleteItem, extractErrorMessage } = useCrud(productsApi)
    const [providers, setProviders] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formError, setFormError] = useState(null)
    

    useEffect(() => {
        providersApi.getAll().then(({ data }) => setProviders(data)).catch(() => setProviders([]))
    }, [])

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        {
        key: 'price',
        label: 'Precio',
        render: (row) => `$${Number(row.price).toLocaleString('es-CO')}`
        },
        { key: 'stock', label: 'Stock' },
        {
        key: 'providerName',
        label: 'Proveedor',
        render: (row) => row.providerName || '—'
        }
    ]

    const openCreate = () => {
        setEditingProduct(null)
        setFormError(null)
        setShowForm(true)
    }

    const openEdit = (product) => {
        setEditingProduct(product)
        setFormError(null)
        setShowForm(true)
    }

    const handleSubmit = async (values) => {
        try {
        if (editingProduct) {
            await updateItem(editingProduct.id, values)
        } else {
            await createItem(values)
        }
        setShowForm(false)
        } catch (err) {
        setFormError(extractErrorMessage(err))
        }
    }

    const handleDelete = async (product) => {
        if (!window.confirm(`¿Eliminar el producto "${product.name}"?`)) return
        try {
        await deleteItem(product.id)
        } catch (err) {
        alert(extractErrorMessage(err))
        }
    }
    
    return (
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Productos</h2>
            <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Nuevo producto
            </button>
        </div>
        {loading && <p>Cargando productos...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
            <DataTable columns={columns} data={products} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <Modal
            show={showForm}
            title={editingProduct ? 'Editar producto' : 'Nuevo producto'}
            onClose={() => setShowForm(false)}
        >
            <ProductForm
            initialValues={editingProduct}
            providers={providers}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            error={formError}
            />
        </Modal>
        </div>
    )
}
