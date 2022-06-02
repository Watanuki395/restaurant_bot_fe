import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { selectComponentRequested } from '../../actions/selectcomponentAction';
import { editProductAction} from '../../actions/editproductAction';
import { productoByCategoryRequested } from "../../actions/productbycategoryAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const initialState ={
    producto: "",
    descripcion: ""
}


const editProduct = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id_prd} = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useSelector( (state) => state.entries.productbycategory.productByCategory );
    let id_cat = data[0].id_cat;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(id_prd){
          const product = data.find(item => item.id_prd === Number(id_prd));
          setFormValue({ ...product })
        }
      }, [id_prd]);

      // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formValue, setFormValue] = useState(initialState)
    const {producto, descripcion} = formValue;
    //const {name_prd, description_prd, imgURL_prd} = formValue;
    const onHandleSubmit = (e) => {
      e.preventDefault();
      //if(name_cat && description_cat){
        dispatch(editProductAction({ formValue}));
        toast.success("Producto actualizada satisfactoriamente.");
        dispatch(productoByCategoryRequested({ id_user: 68,  id_cat}));
        setTimeout(()=> history.push("/CategoryByProduct/"+id_cat), 1000);
      //}
    };
    const onChangeForm = (e) => {
      let {name, value} = e.target;
      setFormValue({
        ...formValue, 
        [name]:value
      })
    };

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 form-container mt-5">
              <form onSubmit={onHandleSubmit}>
                <div className="form-group">
                  <label> Nombre del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del producto"
                    name="producto"
                    value={producto || ""}
                    onChange={onChangeForm}
                  />
                </div>
                <div className="form-group">
                  <label> Descripción del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción del producto"
                    name="descripcion"
                    value={descripcion || ""}
                    onChange={onChangeForm}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold text-uppercase m-3"
                  onClick={() => history.push("/dashboard")}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="btn btn-dark font-weight-bold text-uppercase m-3"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </>
    );
}
 
export default editProduct;