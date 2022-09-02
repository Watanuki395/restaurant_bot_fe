import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom"


function DashboardPage(props){
  
    return (
      <article style={{ padding: "100px" }}>
      <h1>Dashboard</h1>
      <p>La Pagino esta en construccion</p>
      <div className="flexGrow">
          <Link to="/dashboard">Regresar a la pagina de inicio</Link>
      </div>
  </article>
    );
}

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage)
