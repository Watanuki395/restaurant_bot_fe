import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { editCategoryAction } from "../../../actions/editcategoryAction";
import { categoriesRequested } from "../../../actions/categoriesAction";

const ModalEdit = ({obj, estado, setEstado}) => {
  const dispatch = useDispatch();
    console.log(estado);
  const initialStateEdit = {
    name_cat: "",
    description_cat: "",
  };

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [formValueEdit, setFormValueEdit] = useState(initialStateEdit);

  if (estado) {
    handleShowEdit();
    console.log(obj);
  }

  const redirectEdit = (category) => {
    //navigate(`/categoryEdit/${category.id_cat}`, { replace: true });
    setFormValueEdit(category);
    handleShowEdit();
  };

  const { name_cat, description_cat } = formValueEdit;
  const onHandleSubmitEdit = (e) => {
    //e.preventDefault();
    if (name_cat && description_cat) {
      dispatch(editCategoryAction({ formValueEdit }));
      toast.success("Categoría actualizada satisfactoriamente.");
      setTimeout(() => dispatch(categoriesRequested()), 1000);
      setTimeout(handleCloseEdit());
    } else {
      toast.error("ERROR");
    }
  };
  const onChangeFormEdit = (e) => {
    let { name, value } = e.target;
    setFormValueEdit({
      ...formValueEdit,
      [name]: value,
    });
  };

  return (
    <>
      {estado && 
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Formik
            initialValues={initialStateEdit}
            onSubmit={onHandleSubmitEdit}
          >
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Editar categoría</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-container mt-5">
                  <div className="form-group">
                    <label> Nombre de la categoría</label>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Nombre de la categoría"
                      name="name_cat"
                      value={name_cat || ""}
                      onChange={onChangeFormEdit}
                    />
                    <ErrorMessage
                      name="name_cat"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label> Descripción de la categoría</label>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Descripción de la categoría"
                      name="description_cat"
                      value={description_cat || ""}
                      onChange={onChangeFormEdit}
                    />
                    <ErrorMessage
                      name="description_cat"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="submit"
                  className="btn btn-dark font-weight-bold text-uppercase m-3"
                  disabled={name_cat === "" || description_cat === ""}
                >
                  Guardar Cambios
                </button>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal>
      }
    </>
  );
};
 
export default ModalEdit;