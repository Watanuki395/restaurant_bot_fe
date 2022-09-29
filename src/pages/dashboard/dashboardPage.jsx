import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import Widget from "../../components/widget/Widget";

function DashboardPage(props){
  
    return (
<>
<Widget />
</>


    );
}

const mapStateToProps = (response) => ({
  response,
});

export default connect(mapStateToProps)(DashboardPage)
