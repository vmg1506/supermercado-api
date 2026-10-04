import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProvidersPage from './pages/ProvidersPage'
import UsersPage from './pages/UsersPage'
import SalesPage from './pages/SalesPage'


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sales" element={<SalesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
