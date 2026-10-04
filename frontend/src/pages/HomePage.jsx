import { Link } from 'react-router-dom'

export default function HomePage() {
    const modules = [
        { to: '/products', title: 'Productos', desc: 'Catalogo, precios, stock y proveedor asociado' },
        { to: '/providers', title: 'Proveedores', desc: 'Datos de cada proveedor' },
        { to: '/users', title: 'Usuarios', desc: 'Usuarios y rol en el sistema' },
        { to: '/sales', title: 'Ventas', desc: 'Registro de ventas' }
    ]

    return (
        <div>
            <h1 className='mb-3'>Bienvenido a supermercado API</h1>
            <p className='text-muted mb-4'>
                Seleccion de modulos
            </p>

            <div className='row g-3'>
                {modules.map((m) => (
                    <div className='col-12 col-md-6 col-lg-3' key={m.to}>
                        <Link to={m.to} className='text-decoration-none'>
                            <div className='card h-100 shadow-sm'>
                                <div className='card-body'>
                                    <h5 className="card-title">{m.title}</h5>
                                    <p className='card-text text-muted small'>{m.desc}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
