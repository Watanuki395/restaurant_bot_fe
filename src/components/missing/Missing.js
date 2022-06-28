import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops! tenemos un problema!</h1>
            <p>La Pagino no existe o no puede ser contactada</p>
            <div className="flexGrow">
                <Link to="/">Regresar a la pagina de inicio</Link>
            </div>
        </article>
    )
}

export default Missing