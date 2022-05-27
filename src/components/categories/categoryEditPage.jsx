import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { selectComponentRequested } from "../../actions/selectcomponentAction";
import { editCategoryAction } from "../../actions/editcategoryAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import { createGlobalStyle } from "styled-components";

const initialState = {
  name_cat: "",
  description_cat: "",
};

const categoryEdit = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id_cat } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useSelector((state) => state.entries.categories.categories);
  //const {data} = useSelector( (state) => state.entries.editCategory.categoryEdit );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (id_cat) {
      const category = data.find((item) => item.id_cat === Number(id_cat));
      setFormValue({ ...category });
    }
  }, [id_cat]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formValue, setFormValue] = useState(initialState);
  const { name_cat, description_cat } = formValue;
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (name_cat && description_cat) {
      dispatch(editCategoryAction({ formValue }));
      toast.success("Categoría actualizada satisfactoriamente.");
      setTimeout(() => history.push("/dashboard"), 1000);
    } else {
      toast.error("ERROR");
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
        <div className="row ">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 form-container mt-5">
            <form onSubmit={onHandleSubmit}>
              <div className="form-group">
                <label> Nombre de la categoría</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de la categoría"
                  name="name_cat"
                  value={name_cat}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                <label> Descripción de la categoría</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripción de la categoría"
                  name="description_cat"
                  value={description_cat}
                  onChange={onChangeForm}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="btn btn-dark font-weight-bold text-uppercase m-3"
                  disabled={
                    name_cat === '' || description_cat === ''
                  }
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold text-uppercase m-3"
                  onClick={() => history.push("/dashboard")}
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  );
};

export default categoryEdit;
