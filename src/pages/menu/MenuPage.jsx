import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { categoriesRequested } from "../../actions/categoriesAction";
import { toast } from "react-toastify";
import Datatable from "../../components/datatable/Datatable"
//import { connect, useSelector } from "react-redux";

function Menu() {
    const dispatch = useDispatch();

    //const [catData, setCatData] = useState();

    useEffect(async() => {
        try {
            dispatch(categoriesRequested());
        } catch (e) {
            console.log(e)
        }
    }, []);

    let categorias = useSelector((state) => state.entries.categories ? state.entries.categories.categories : null);

    return (
    <Datatable dataRows={categorias} name={"Lista de Categorias"}/>
)
}


export default Menu;
