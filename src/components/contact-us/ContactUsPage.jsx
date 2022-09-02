import { Link } from "react-router-dom"

  const ContactUs = () => {

    return (
      <article style={{ padding: "100px" }}>
            <h1>Pagina Para contacto</h1>
            <p>La Pagino esta en construccion</p>
            <div className="flexGrow">
                <Link to="/">Regresar a la pagina de inicio</Link>
            </div>
        </article>
    )
  }



export default ContactUs;