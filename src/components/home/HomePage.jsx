import { Link } from "react-router-dom"

  const Home = () => {

    return (
      <article style={{ padding: "100px" }}>
            <h1>Pagina de Inicio</h1>
            <p>La Pagino esta en construccion</p>
            <p>aqui va toda la informacion del producto</p>
            <div className="flexGrow">
                <Link to="/">Regresar a la pagina de inicio</Link>
            </div>
        </article>
    )
  }



export default Home;