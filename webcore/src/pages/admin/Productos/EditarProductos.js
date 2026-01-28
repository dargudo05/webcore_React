import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function EditarProductos() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [productoCargado, setProductoCargado] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5118/api/Productos/Obtener/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.response) {
                    setProductoCargado(data.response);
                } else {
                    alert("Producto no encontrado");
                    navigate("/admin/Productos");
                }
            })
            .catch(err => console.error("Error al cargar:", err));
    }, [id, navigate]);

    async function handleSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const producto = Object.fromEntries(formData.entries());
        producto.idProducto = parseInt(id); 

        if (!producto.codigoBarra || !producto.nombre || !producto.marca || !producto.categoria || !producto.precio) {
            alert("Por favor, rellenar todos los campos.");
            return;
        }

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
                alert("Error al guardar.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    }

    if (!productoCargado) return <div className="container mt-4">Cargando datos...</div>;

    return (
        <div className="container mt-4">
            <h2>Editar Producto ID: {id}</h2>

            <form onSubmit={handleSubmit}>
                <p><b>Código de Barra</b></p>
                <input name="codigoBarra" type="text" className="form-control mb-3" 
                       defaultValue={productoCargado.codigoBarra} />
                
                <p><b>Nombre</b></p>
                <input name="nombre" type="text" className="form-control mb-3" 
                       defaultValue={productoCargado.nombre} />
                
                <p><b>Marca</b></p>
                <input name="marca" type="text" className="form-control mb-3" 
                       defaultValue={productoCargado.marca} />
                
                <p><b>Categoría</b></p>
                <input name="categoria" type="text" className="form-control mb-3" 
                       defaultValue={productoCargado.categoria} />
                
                <p><b>Precio</b></p>
                <input name="precio" type="number" step="0.01" className="form-control mb-4" 
                       defaultValue={productoCargado.precio} />

                <button type="submit" className="btn btn-primary me-2"> 
                    Guardar Cambios 
                </button> 

                <Link to="/admin/Productos" className="btn btn-outline-secondary"> 
                    Cancelar 
                </Link>
            </form>
        </div>
    );
}