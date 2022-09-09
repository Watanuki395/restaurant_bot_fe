import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
//import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./Columns";
import { Modal, Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";

import { createCategoryAction } from '../../actions/createCategoriesAction';
import { categoriesRequested } from "../../actions/categoriesAction";
//import { deleteCategoryAction } from "../../actions/deletecategoryAction";
//import { productoByCategoryRequested } from "../../actions/productbycategoryAction";
//import { productoByCategoryRequested } from "../../actions/productsAction";
//import { editCategoryAction } from "../../actions/editcategoryAction";
import  Table  from "../common/reactTable/Table";
//import { productoByCategoryRequested } from "../../actions/productsAction";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconDelete, IconEdit, IconSee, SButton, FormContainer } from "./style";
import "../../index.css";
import {Loading} from "../common/Loading";

const Categories = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [isReseted, setReseted] = useState(false);
  const [count, setCount] = useState(0);

  //#region  Modal Agregar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const initialValues = {
      name_cat: "",
      description_cat: "",
    };
  
    const validationSchema = Yup.object().shape({
      name_cat: Yup.string()
        .required("Campo Requerido")
        .min(2, `Mínimo 5 caracteres`)
        .max(255, `Máximo 255 caracteres`),
      description_cat: Yup.string()
        .required("Campo Requerido")
        .min(2, `Mínimo 5 caracteres`)
        .max(255, `Máximo 255 caracteres`),
    });
  
    async function onHandleSubmit(data) {
      await sleep(1000);
      setReseted(true);
      try {
        if (data) {
          setReseted(true);
          dispatch(createCategoryAction(data));
        }
      } catch (err){
        console.log(err);
      }
    }
  
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  
    const createResponse = useSelector((state) => state.entries.categories ? state.entries.categories.createdCategory.id_cat : null);
    //#endregion

  //#region  UseSelector

  let categorias = useSelector((state) => state.entries.categories ? state.entries.categories.categories : null);
  const error = useSelector((state) => state.entries.categories ? state.entries.categories.error : null);
  const DeleteProductResponse = useSelector((state) => state.entries.categories.deleteCategoryResponse);

  //#endregion

  //#region React-Table
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => [...categorias], [categorias]);
  //#endregion

  useEffect(() => {
    /* if(!createResponse){  //Revisar validación para que se ejecute solo la primera vez que entra
      const cargarProductos = () => dispatch(categoriesRequested());
      cargarProductos();
     } */
    try {
      if(createResponse !== [] && createResponse !== 'ERROR'){
        setTimeout(() => dispatch(categoriesRequested()), 1000);
        setTimeout(() => setShow(false), 1100);
      } else{
        const cargarProductos = () => dispatch(categoriesRequested());
      cargarProductos();
      }
    } catch (e){
      if(!e?.createResponse){
        toast.error("Servidor no responde.");
      } else if(!e?.status === 400){
        toast.error("Servidor no responde.");
      } else if(!e?.status === 204){
        toast.error("Esa categoría ya existe.");
      }
    }
  }, [createResponse]);

  useEffect(()=>{
    if(DeleteProductResponse){
      setTimeout(() => dispatch(categoriesRequested()), 1000);
    }
  }, [DeleteProductResponse]);

  return (
    <>
      <div className="container">
        <div>
        {error ? (
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error...
          </p>
        ) : null}



        <button
          className="btn btn-warning btn-plus mt-3"
          variant="primary"
          onClick={handleShow}
        >
          <GrAdd />
        </button>
        <button
          className="btn btn-dark btn-plus mt-3 ml-3"
          variant="primary"
          onClick={""} //Pasarle el evento con los elementos a borrar
        >
          <IconDelete/>
        </button>

        

       <Table data = {data} columns = {columns}></Table>

        </div>
      </div> 

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar una categoría nueva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => onHandleSubmit(values)}
            >
              {({isSubmitting }) => (
                <Form>
                  <section className="">
                    <section className="">
                      <section className="">
                        <div>
                          <FormContainer>
                            <div>
                              <div className="mb-3">
                                <label
                                  htmlFor="name_cat"
                                  className="form-label"
                                >
                                  Nombre la categoría
                                </label>
                                <Field
                                  type="text"
                                  className="form-text form-control"
                                  name="name_cat"
                                  id="name_cat"
                                  placeholder="Categoría"
                                />
                                <ErrorMessage
                                  name="name_cat"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="description_cat"
                                  className="form-label"
                                >
                                  Descripción
                                </label>
                                <Field
                                  type="description_cat"
                                  className="form-text form-control"
                                  name="description_cat"
                                  id="description_cat"
                                  placeholder="Descripción de la categoría"
                                />
                                <ErrorMessage
                                  name="description_cat"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              </div>
                              <div className="d-grid gap-2 py-3">
                                <button
                                  type="submit"
                                  disabled={
                                    count > 0 ? true : false || isSubmitting
                                  }
                                  className="btn btn-dark btn-block mb-2"
                                >
                                  {isSubmitting && (
                                    <span className="spinner-border spinner-border-sm mr-1"></span>
                                  )}
                                  Crear
                                </button>
                              </div>
                            </div>
                          </FormContainer>
                        </div>
                      </section>
                    </section>
                  </section>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

    </>
  );
};

const mapStateToProps = (response) => ({
  response,
});
export default connect(mapStateToProps)(Categories);
