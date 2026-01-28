import { useNavigate, Link } from "react-router-dom";

export default function AñadirProductos() {
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const producto = Object.fromEntries(formData.entries());

        if (!producto.codigoBarra || !producto.nombre || !producto.marca || !producto.categoria || !producto.precio) {
            alert("Por favor, rellenar todos los campos.");
            return;
        }

        if (producto.codigoBarra.length < 8 || producto.codigoBarra.length > 8) {
            alert("El código de barra debe tener exactamente 8 dígitos.");
            return;
        }

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
                alert("Error al guardar.");
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
                <input name="codigoBarra" type="text" className="form-control mb-3" placeholder="Ej: 12345678"/>
                
                <p><b>Nombre</b></p>
                <input name="nombre" type="text" className="form-control mb-3" placeholder="Nombre del producto."/>
                
                <p><b>Marca</b></p>
                <input name="marca" type="text" className="form-control mb-3" placeholder="Marca del producto."/>
                
                <p><b>Categoría</b></p>
                <input name="categoria" type="text" className="form-control mb-3" placeholder="Categoría del producto."/>    
                
                <p><b>Precio</b></p>
                <input name="precio" type="number" step="0.01" className="form-control mb-4" placeholder="0.00"/>

                <button type="submit" className="btn btn-primary me-2"> 
                    Guardar Producto 
                </button> 

                <Link to="/admin/Productos" className="btn btn-outline-secondary"> 
                    Cancelar 
                </Link>
            </form>
        </div>
    );
}