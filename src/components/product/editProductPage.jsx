import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link, useNavigate, useLocation, Navigate, useParams } from "react-router-dom";

import { selectComponentRequested } from "../../actions/selectcomponentAction";
import { editProductAction } from "../../actions/editproductAction";
import { productoByCategoryRequested } from "../../actions/productbycategoryAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

const EditProduct = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id_prd } = useParams();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useSelector(
    (state) => state.entries.productbycategory.productByCategory
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = useSelector(
    (state) => state.entries.productbycategory.productByCategory.error
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let success = useSelector((state) => state.entries.editProduct.edit);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const msg = useSelector((state) => state.entries.editProduct.response.msg);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [resetSuccess, setResetSuccess] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const id_cat = data[0].id_cat;
  console.log(id_cat);
  const initialState = {
    producto: "",
    descripcion: "",
    price_prd: 0,
    isOnMenu: "",
    id_cat: id_cat,
    id_user: 68,
    id_prd: id_prd,
    imgURL_prd: "",
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      if (id_prd) {
        const product = data.find((item) => item.id_prd === Number(id_prd));
        setFormValue({ ...product });
      }
      if (success && resetSuccess) {
        setResetSuccess(false);
        toast.success("Producto actualizada satisfactoriamente.");
        dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
        setTimeout(() => navigate("/CategoryByProduct/" + id_cat, { replace: true }) , 1000);
      }
    } catch (error) {
      if (response) {
        toast.error("Ocurrió un error.");
        setResetSuccess(false);
      }
    }
  }, [id_prd, success, resetSuccess]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formValue, setFormValue] = useState(initialState);
  const { producto, descripcion, imgURL_prd, price_prd, isOnMenu } = formValue;
  const onHandleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(editProductAction({ formValue }));
      setResetSuccess(true);
    } catch (error) {
      console.log(error);
      setResetSuccess(false);
    }
  };
  const onChangeForm = (e) => {
    let { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
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

              <div className="form-group">
                <label> Imagen del producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Imagen del producto"
                  name="imgURL_prd"
                  value={imgURL_prd || ""}
                  onChange={onChangeForm}
                />
              </div>

              <div className="form-group">
                <label> Precio del producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="price_prd"
                  value={price_prd || ""}
                  onChange={onChangeForm}
                />
              </div>

              <div className="mb-3">
                <label className="form-check-label">Menú</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isOnMenu"
                    value={true}
                    checked={isOnMenu === true ? true : false}
                    onChange={onChangeForm}
                  />
                  <label className="form-check-label" htmlFor="isOnMenu">
                    Sí
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isOnMenu"
                    value={false}
                    checked={isOnMenu === false ? true : false}
                    onChange={onChangeForm}
                  />
                  <label className="form-check-label" htmlFor="isOnMenu">
                    No
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary font-weight-bold text-uppercase m-3"
                onClick={() => navigate(from, { replace: true })}
              >
                Volver
              </button>
              <button
                type="submit"
                className="btn btn-dark font-weight-bold text-uppercase m-3"
                disabled={
                  producto === "" || descripcion === "" || imgURL_prd === ""
                }
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
};

export default EditProduct;
