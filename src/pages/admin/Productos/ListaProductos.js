import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

export default function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const [CodigoABuscar, setCodigoABuscar] = useState("");

    const buscarPorCodigo = () => {
        if (!CodigoABuscar) {
            obtenerProductos();
            return;
        }

        const resultado = productos.find(p => 
        p.codigoBarra === CodigoABuscar || p.idProducto.toString() === CodigoABuscar);

        if (resultado) {
            setProductos([resultado]); 
        } else {
            alert("No se encontró ningún producto con ese código.");
            setCodigoABuscar("");
        }

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
                setCodigoABuscar("");
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
                method: "PATCH"
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
                    <input type="number" class="form-control" placeholder="Ingresar código de barras del producto" value={CodigoABuscar} onChange={(e) => setCodigoABuscar(e.target.value)}/>
                    <button className="btn btn-primary" type="button" onClick={buscarPorCodigo}> Buscar</button>
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
                        <th>Estado</th>
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
                        <td>{product.estado}</td>
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