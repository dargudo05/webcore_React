import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function EditarProductos() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [producto, setProducto] = useState({
        idProducto: 0,
        codigoBarra: "",
        nombre: "",
        marca: "",
        categoria: "",
        precio: "",
        estado: "a"
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    // ------------ Cargar producto
    useEffect(() => {
        fetch(`http://localhost:5118/api/Productos/Obtener/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.response) {
                    setProducto({
                        idProducto: data.response.idProducto,
                        codigoBarra: data.response.codigoBarra,
                        nombre: data.response.nombre,
                        marca: data.response.marca,
                        categoria: data.response.categoria,
                        precio: data.response.precio,
                        estado: data.response.estado
                    });
                    setCargando(false);
                } else {
                    alert("Producto no encontrado");
                    navigate("/admin/Productos");
                }
            })
            .catch(err => {
                console.error("Error al cargar:", err);
                navigate("/admin/Productos");
            });
    }, [id, navigate]);

    // ----------- Validar
    function validar(campo, valor) {
        let mensaje = "";

        switch (campo) {
            case "nombre":
            case "marca":
            case "categoria":
                if (valor.trim() === "")
                    mensaje = "Este campo no puede estar vacío";
                break;

            case "precio":
                if (valor === "" || Number(valor) <= 0)
                    mensaje = "El precio debe ser mayor a 0";
                break;

            case "estado":
                if (valor !== "a" && valor !== "i") {
                    mensaje = "Debe seleccionar un estado válido";
                }
                break;

            default:
                break;
        }

        return mensaje;
    }

    // ------------ On change
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

    // ------------- Submit 
    async function handleSubmit(e) {
        e.preventDefault();
        if (formularioInvalido) return;

        try {
            const response = await fetch("http://localhost:5118/api/Productos/Editar", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });

            if (response.ok) {
                alert("¡Producto editado con éxito!");
                navigate("/admin/Productos");
            } else {
                const data = await response.json();
                setErrores(data);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }

    if (cargando) {
        return <div className="container mt-4">Cargando datos...</div>;
    }

    // --------------------------------------
    return (
        <div className="container mt-4">
            <h2>Editar Producto ID: {id}</h2>

            <form onSubmit={handleSubmit}>

                <p><b>Código de Barra</b></p>
                <input
                    name="codigoBarra"
                    type="text"
                    readOnly
                    value={producto.codigoBarra}
                    onChange={handleChange}
                    className="form-control"
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
                />
                {errores.precio && (
                    <small className="text-danger">{errores.precio}</small>
                )}

                <p className="mt-3"><b>Estado</b></p>
                <select name="estado" 
                className="form-select" 
                aria-label="Default select example"
                 value={producto.estado}
                onChange={handleChange}>
                    <option selected>Seleccionar estado</option>
                    <option value="a">Activo</option>
                    <option value="i">Inactivo</option>
                </select>

                {errores.estado && (
                    <small className="text-danger">{errores.estado}</small>
                )}

                <div className="d-flex align-items-center"> 

                    <button
                        type="submit"
                        className="btn btn-primary mt-4 me-2"
                        disabled={formularioInvalido}
                    >
                        Guardar Producto
                    </button>

                    <Link to="/admin/Productos" className="btn btn-outline-secondary mt-4 me-2">
                        Cancelar
                    </Link>

                </div>
            </form>
        </div>
    );
}
