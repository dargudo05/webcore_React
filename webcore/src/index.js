import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './pages/Home';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import ListaProductos from './pages/admin/Productos/ListaProductos';
import AñadirProductos from './pages/admin/Productos/AñadirProductos';
import EditarProductos from './pages/admin/Productos/EditarProductos';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/admin/Productos" element={<ListaProductos />} />
      <Route path="/admin/Productos/Crear" element={<AñadirProductos />} />
      <Route path="/admin/Productos/Editar/:id" element={<EditarProductos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

