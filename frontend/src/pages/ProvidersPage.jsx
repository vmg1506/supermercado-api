import { useState } from 'react'
import { providersApi } from '../api/providersApi'
import { useCrud } from '../hooks/useCrud'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import ProviderForm from './ProviderForm'

export default function ProvidersPage() {
    const { items: providers, loading, error, createItem, updateItem, deleteItem, extractErrorMessage } = useCrud(providersApi)
    const [showForm, setShowForm] = useState(false)
    const [editingProvider, setEditingProvider] = useState(null)
    const [formError, setFormError] = useState(null)
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'email', label: 'Email' },
        { key: 'city', label: 'Ciudad' }
    ]

    const openCreate = () => {
        setEditingProvider(null)
        setFormError(null)
        setShowForm(true)
    }

    const openEdit = (provider) => {
        setEditingProvider(provider)
        setFormError(null)
        setShowForm(true)
    }

    const handleSubmit = async (values) => {
        try {
        if (editingProvider) {
            await updateItem(editingProvider.id, values)
        } else {
            await createItem(values)
        }
        setShowForm(false)
        } catch (err) {
        setFormError(extractErrorMessage(err))
        }
    }

    const handleDelete = async (provider) => {
        if (!window.confirm(`¿Eliminar el proveedor "${provider.name}"?`)) return
        try {
        await deleteItem(provider.id)
        } catch (err) {
        alert(extractErrorMessage(err))
        }
    }
    
    return (
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Proveedores</h2>
            <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Nuevo proveedor
            </button>
        </div>
        {loading && <p>Cargando proveedores...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
            <DataTable columns={columns} data={providers} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <Modal
            show={showForm}
            title={editingProvider ? 'Editar proveedor' : 'Nuevo proveedor'}
            onClose={() => setShowForm(false)}
        >
            <ProviderForm
            initialValues={editingProvider}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            error={formError}
            />
        </Modal>
        </div>
    )
}
