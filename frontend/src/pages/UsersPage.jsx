import { useState } from 'react'
import { usersApi } from '../api/usersApi'
import { useCrud } from '../hooks/useCrud'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import UserForm from './UserForm'

export default function UsersPage() {
    const { items: users, loading, error, createItem, updateItem, deleteItem, extractErrorMessage } = useCrud(usersApi)
    const [showForm, setShowForm] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [formError, setFormError] = useState(null)
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Email' },
        {
        key: 'role',
        label: 'Rol',
        render: (row) => (
            <span className={`badge ${row.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
            {row.role === 'admin' ? 'Administrador' : 'Cliente'}
            </span>
        )
        }
    ]

    const openCreate = () => {
        setEditingUser(null)
        setFormError(null)
        setShowForm(true)
    }

    const openEdit = (user) => {
        setEditingUser(user)
        setFormError(null)
        setShowForm(true)
    }

    const handleSubmit = async (values) => {
        try {
        if (editingUser) {
            await updateItem(editingUser.id, values)
        } else {
            await createItem(values)
        }
        setShowForm(false)
        } catch (err) {
        setFormError(extractErrorMessage(err))
        }
    }

    const handleDelete = async (user) => {
        if (!window.confirm(`¿Eliminar el usuario "${user.name}"?`)) return
        try {
        await deleteItem(user.id)
        } catch (err) {
        alert(extractErrorMessage(err))
        }
    }
    
    return (
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Usuarios</h2>
            <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Nuevo usuario
            </button>
        </div>
        {loading && <p>Cargando usuarios...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
            <DataTable columns={columns} data={users} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <Modal
            show={showForm}
            title={editingUser ? 'Editar usuario' : 'Nuevo usuario'}
            onClose={() => setShowForm(false)}
        >
            <UserForm
            initialValues={editingUser}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            error={formError}
            />
        </Modal>
        </div>
    )
}
