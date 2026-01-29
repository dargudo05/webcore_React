import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

export default function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const [idABuscar, setIdABuscar] = useState("");

    const buscarPorId = () => {
        if (!idABuscar) {
            obtenerProductos();
            return;
        }

        fetch(`http://localhost:5118/api/Productos/Obtener/${idABuscar}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("No se pudo conectar con el servidor");
            })
            .then(data => {
                if (data.response) {               
                    setProductos([data.response]); 
                } else {
                    alert("No existe un producto con ese ID");
                }
            })
            .catch(error => {
                alert("Error en la búsqueda. Verifique que el ID sea un número.");
            });
    };

    function obtenerProductos() {
        fetch("http://localhost:5118/api/Productos/Lista")
            .then(response => {
                if(response.ok) {
                    return response.json();
                }

                throw new Error()
            })
            .then(data => {
                setProductos(data.response)
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error)
            })  
    }
    useEffect(() => {
        obtenerProductos();
    }, []);

    function BorrarProducto(id) {
        if (window.confirm("¿Está seguro de eliminar el producto con ID " + id + "?")) {
            fetch(`http://localhost:5118/api/Productos/Eliminar/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    alert("Producto eliminado con éxito.");
                    obtenerProductos(); 
                } else {
                    alert("Error al eliminar el producto.");
                }
            })
            .catch(error => {
                console.error("Error al eliminar el producto:", error);
            });
        }
    }

    return (
        <div className="container mt-4">
            <h2>Productos</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-2" to="/admin/Productos/Crear">Agregar Producto</Link>
                    <button className="btn btn-outline-primary" onClick={obtenerProductos}>Refrescar</button>
                    <input type="number" class="form-control" placeholder="Ingresar ID del producto." value={idABuscar} onChange={(e) => setIdABuscar(e.target.value)}/>
                    <button className="btn btn-primary" type="button" onClick={buscarPorId}> Buscar</button>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id Producto</th>
                        <th>Código Barra</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {productos.map((product) => (
                    <tr key={product.idProducto}>
                        <td>{product.idProducto}</td>
                        <td>{product.codigoBarra}</td>
                        <td>{product.nombre}</td>
                        <td>{product.marca}</td>
                        <td>{product.categoria}</td>
                        <td>{product.precio}</td>
                        <td style={{ minWidth: "150px" }}>
                            <Link
                                className="btn btn-sm btn-warning me-2"
                                to={`/admin/Productos/Editar/${product.idProducto}`}
                            >
                                Editar
                            </Link>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={(() => BorrarProducto(product.idProducto))}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

            </table>
        </div>
    );
}