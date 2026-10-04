import { useEffect, useState } from 'react'
import { salesApi } from '../api/salesApi'
import { usersApi } from '../api/usersApi'
import { productsApi } from '../api/productsApi'
import { useCrud } from '../hooks/useCrud'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import SaleForm from './SaleForm'


export default function SalesPage() {

    const { items: sales, loading, error, createItem, extractErrorMessage } = useCrud(salesApi)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [detailSale, setDetailSale] = useState(null)
    const [loadingDetail, setLoadingDetail] = useState(false)

    useEffect(() => {
        usersApi.getAll().then(({ data }) => setUsers(data)).catch(() => setUsers([]))
        productsApi.getAll().then(({ data }) => setProducts(data)).catch(() => setProducts([]))
    }, [])

    const findUserName = (userId) => users.find((u) => u.id === userId)?.name || `Usuario #${userId}`
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'userId', label: 'Usuario', render: (row) => findUserName(row.userId) },
        {
        key: 'total',
        label: 'Total',
        render: (row) => `$${Number(row.total).toLocaleString('es-CO')}`
        },
        {
        key: 'detail',
        label: '',
        render: (row) => (
            <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => openDetail(row.id)}
            >
            Ver detalle
            </button>
        )
        }
    ]

    const openDetail = async (id) => {
        setLoadingDetail(true)
        try {
        const { data } = await salesApi.getById(id)
        setDetailSale(data)
        } catch (err) {
        alert(extractErrorMessage(err))
        } finally {
        setLoadingDetail(false)
        }
    }

    const handleSubmit = async (values) => {
        try {
        await createItem(values)
        setShowForm(false)
        } catch (err) {
        setFormError(extractErrorMessage(err))
        }
    }
    
    return (
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Ventas</h2>
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => { setFormError(null); setShowForm(true) }}
            >
            + Nueva venta
            </button>
        </div>
        {loading && <p>Cargando ventas...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && <DataTable columns={columns} data={sales} />}
        <Modal show={showForm} title="Nueva venta" onClose={() => setShowForm(false)}>
            <SaleForm
            users={users}
            products={products}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            error={formError}
            />
        </Modal>
        <Modal show={Boolean(detailSale)} title={`Detalle de la venta #${detailSale?.id ?? ''}`} onClose={() => setDetailSale(null)}>
            {loadingDetail && <p>Cargando...</p>}
            {detailSale && (
            <div>
                <p>
                <strong>Usuario:</strong> {findUserName(detailSale.userId)}<br />
                <strong>Total:</strong> ${Number(detailSale.total).toLocaleString('es-CO')}
                </p>
                <table className="table table-sm">
                <thead>
                    <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unit.</th>
                    </tr>
                </thead>
                <tbody>
                    {detailSale.details?.map((d) => (
                    <tr key={d.id}>
                        <td>{d.productName}</td>
                        <td>{d.quantity}</td>
                        <td>${Number(d.price).toLocaleString('es-CO')}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </Modal>
        </div>
    )
}