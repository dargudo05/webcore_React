import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">     
                <img src = "/box-seam.svg" alt="Box Icon" width="30" height="30"/> CRUD Productos
                </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-dark" to="/contacto">Contacto</Link>
                </li>
                
            </ul>
            <ul className="navbar-nav">    
               <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administrar
                </a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/admin/Productos">Productos</Link></li>
                </ul>
                </li>
                <li className="nav-item">
                </li> 
            </ul>
            </div>
        </div>
        </nav>
    )
}
export function Footer() {
    return (
        <div className="bg-light text-center text-lg-start mt-5 border-top">
        <img src = "/box-seam.svg" alt="Box Icon" width="30" height="30"/>
        CRUD Productos
        </div>
    )
}