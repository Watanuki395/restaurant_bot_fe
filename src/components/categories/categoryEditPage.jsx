import React, { Fragment, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { selectComponentRequested } from '../../actions/selectcomponentAction';
import { editCategoryAction} from '../../actions/editcategoryAction';

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
import { createGlobalStyle } from 'styled-components';


const initialState ={
  name_cat: "",
  description_cat: ""
}

const categoryEdit = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id_cat} = useParams();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useSelector( (state) => state.entries.categories.categories );
    //const {data} = useSelector( (state) => state.entries.editCategory.categoryEdit );
    console.log(data);

    console.log(data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if(id_cat){
        const category = data.find(item => item.id_cat === Number(id_cat));
        setFormValue({ ...category })
      }
    }, [id_cat]);
    
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formValue, setFormValue] = useState(initialState)
    const {name_cat, description_cat} = formValue;
    const onHandleSubmit = (e) => {
      e.preventDefault();
      //if(name_cat && description_cat){
        dispatch(editCategoryAction({ formValue}));
        toast.success("Categoría actualizada satisfactoriamente.");
        setTimeout(()=> history.push("/dashboard"), 1000);
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
        <form onSubmit={onHandleSubmit}>
                    <div className='form-group'>
                        <label> Nombre de la categoría</label>
                        <input
                        type="text"
                        className='form-control'
                        placeholder='Nombre de la categoría'
                        name='name_cat'
                        value={name_cat}
                        onChange={onChangeForm}
                        />
                    </div>
                    <div className='form-group'>
                        <label> Descripción de la categoría</label>
                        <input
                        type="text"
                        className='form-control'
                        placeholder='Descripción de la categoría'
                        name='description_cat'
                        value={description_cat}
                        onChange={onChangeForm}
                        />
                    </div>
                    <button
                        type='button'
                        className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                        onClick={()=>history.push("/dashboard")}
                    >Volver
                    </button>
                    <button
                        type='submit'
                        className='btn btn-dark font-weight-bold text-uppercase d-block w-100'
                    >Guardar Cambios
                    </button>
                </form>

            {/* <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              //onSubmit={(values) => onHandleSubmit(values)}
              onSubmit={(values) => console.log(values)}
            >
              {({ errors, touched, isSuccess, message, isSubmitting }) => (
                <Form>
                    <section className="">
                      <section className="">
                        <section className="">
                          <div>
                            {!isSuccess ? (
                              <div>{message}</div>
                            ) : (
                              <Redirect to="dashboard" />
                            )}
                            <div className="form-container">
                              <div>
                                {!isSuccess ? (
                                  <div>{message}</div>
                                ) : (
                                  <Redirect to="dashboard" />
                                )}
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
                                    value={name_cat}
                                    onChange={onChangeForm}
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
                                    value={description_cat}
                                    onChange={onChangeForm}
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
                                    Editar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </section>
                    </section>
                </Form>
              )}
            </Formik> */}


        </>
     );
}
 
export default categoryEdit;