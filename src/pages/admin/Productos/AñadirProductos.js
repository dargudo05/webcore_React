import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function AñadirProductos() {
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        codigoBarra: "",
        nombre: "",
        marca: "",
        categoria: "",
        precio: ""
    });

    const [errores, setErrores] = useState({});

    function validar(campo, valor) {
        let mensaje = "";

        switch (campo) {
            case "codigoBarra":
                if (!/^\d*$/.test(valor)) {
                    mensaje = "Solo se permiten números";
                } else if (valor.length !== 8) {
                    mensaje = "Debe tener exactamente 8 dígitos";
                }
                break;

            case "nombre":
            case "marca":
            case "categoria":
                if (valor.trim() === "") {
                    mensaje = "Este campo no puede estar vacío";
                }
                break;

            case "precio":
                if (valor === "" || Number(valor) <= 0) {
                    mensaje = "El precio debe ser mayor a 0";
                }
                break;

            default:
                break;
        }

        return mensaje;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setProducto(prev => ({
            ...prev,
            [name]: value
        }));

        setErrores(prev => ({
            ...prev,
            [name]: validar(name, value)
        }));
    }

    const formularioInvalido =
        Object.values(errores).some(e => e) ||
        Object.values(producto).some(v => v === "");

    async function handleSubmit(e) {
        e.preventDefault();

        if (formularioInvalido) return;

        try {
            const response = await fetch("http://localhost:5118/api/Productos/Guardar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                alert("¡Producto creado con éxito!");
                navigate("/admin/Productos");
            } else {
                const data = await response.json();
                setErrores(data);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Añadir Productos</h2>

            <form onSubmit={handleSubmit}>

                <p><b>Código de Barra</b></p>
                <input
                    name="codigoBarra"
                    type="text"
                    value={producto.codigoBarra}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ej: 12345678"
                />
                {errores.codigoBarra && (
                    <small className="text-danger">{errores.codigoBarra}</small>
                )}

                <p className="mt-3"><b>Nombre</b></p>
                <input
                    name="nombre"
                    type="text"
                    value={producto.nombre}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nombre del producto"
                />
                {errores.nombre && (
                    <small className="text-danger">{errores.nombre}</small>
                )}

                <p className="mt-3"><b>Marca</b></p>
                <input
                    name="marca"
                    type="text"
                    value={producto.marca}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Marca del producto"
                />
                {errores.marca && (
                    <small className="text-danger">{errores.marca}</small>
                )}

                <p className="mt-3"><b>Categoría</b></p>
                <input
                    name="categoria"
                    type="text"
                    value={producto.categoria}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Categoría del producto"
                />
                {errores.categoria && (
                    <small className="text-danger">{errores.categoria}</small>
                )}

                <p className="mt-3"><b>Precio</b></p>
                <input
                    name="precio"
                    type="number"
                    step="0.01"
                    value={producto.precio}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0.00"
                />
                {errores.precio && (
                    <small className="text-danger">{errores.precio}</small>
                )}

                <button
                    type="submit"
                    className="btn btn-primary mt-4 me-2"
                    disabled={formularioInvalido}
                >
                    Guardar Producto
                </button>

                <Link to="/admin/Productos" className="btn btn-outline-secondary mt-4">
                    Cancelar
                </Link>
            </form>
        </div>
    );
}
