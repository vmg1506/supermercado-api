import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
    const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="d-flex flex-column min-vh-100" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        Supermercado-API
                    </NavLink>

                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm ms-auto me-2 order-lg-2"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                        title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    >
                        {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>

                    <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                    aria-controls="navMenu"
                    aria-label="alternar navegación"
                    >
                        <span className= "navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to= "/products" className={linkClass}>Productos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/providers" className={linkClass}>Proveedores</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/users" className={linkClass}>Usuarios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to= "/sales" className={linkClass}>Ventas</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container py-4 flex-grow-1">
                <Outlet/>
            </main>

            <footer className="bg-body-tertiary border-top py-3 text-center text-muted small">
                Supermercado API &copy; {new Date().getFullYear()}
            </footer>
        </div>

    )
}
