import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { categoriesRequested } from "../../../actions/categoriesAction";
import { productoByCategoryRequested } from "../../../actions/productsAction";
import { deleteCategoryAction } from "../../../actions/categoriesAction";
import { editCategoryAction } from "../../../actions/categoriesAction";
import Filter from "./Filter";
import { CheckBox } from "./CheckBox";

import { IconDelete, IconEdit, IconSee, SButton } from "../../categories/style";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { Loading } from "../Loading/index";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Table = ({ data, columns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //let categorias = useSelector((state) => state.entries.categories ? state.entries.categories.categories : null);

  const redirectProductByCategory = (idCategory) => {
    let id_cat = idCategory.id_cat;
    dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
    navigate(`/CategoryByProduct/${idCategory.id_cat}`, { replace: true });
  };

  //#region  Modal Eliminar
  const [idToDelete, setIdToDelete] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const [perc, setPerc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = (id_cat) => {
    setIdToDelete(id_cat);
    handleShowDelete(false);
  };

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const onHandleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategoryAction(idToDelete));
    setLoading(true);
  };

  const LoadingHandler = () => {
    return (
      <Loading
        message={
          perc !== null && perc < 100
            ? ` Eliminando... ${perc}`
            : " Eliminando..."
        }
      />
    );
  };

  const responseDeleteCategory = useSelector((state) =>
    state.entries.categories ? state.entries.categories.deletedCategory : null
  );

  useEffect(() => {
    if (responseDeleteCategory) {
      setTimeout(() => setShowDelete(false), 1100);
      setTimeout(() => dispatch(categoriesRequested()), 1000);
      setLoading(false);
    }
  }, [responseDeleteCategory]);
  //#endregion
 
  //#region Modal Editar

 const [showEdit, setShowEdit] = useState(false);
 const handleCloseEdit = () => setShowEdit(false);
 const handleShowEdit = () => setShowEdit(true);

 const initialStateEdit = {
   name_cat: "",
   description_cat: "",
 };

 const [formValueEdit, setFormValueEdit] = useState(initialStateEdit);
 
 
 const Edit = (category) => {
   //navigate(`/categoryEdit/${category.id_cat}`, { replace: true });
   setFormValueEdit(category);
   handleShowEdit();
 };
 const { name_cat, description_cat } = formValueEdit;

 const onChangeFormEdit = (e) => {
   let { name, value } = e.target;
   setFormValueEdit({
     ...formValueEdit,
     [name]: value,
   });
 };

 const onHandleSubmitEdit = (e) => {
  //e.preventDefault();
  if (name_cat && description_cat) {
    dispatch(editCategoryAction({ formValueEdit }));
  }
};

 const responseEdit = useSelector((state) =>
 state.entries.categories ? state.entries.categories.editedCategory : null
);

 useEffect(()=>{
    if(responseEdit !== []){
      setTimeout(() => dispatch(categoriesRequested()), 1000);
      setTimeout(handleCloseEdit());
    }
 }, [responseEdit]);

 //#endregion

  //#region React Table
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <>
            <SButton
              className="mb-1"
              onClick={() => redirectProductByCategory(row.original)}
            >
              <IconSee></IconSee>
            </SButton>

            <SButton
              onClick={() => Edit(row.original)}
            >
              <IconEdit></IconEdit>
            </SButton>

            <SButton
              className=""
              onClick={() => confirmDelete(row.original.id_cat)}
            >
              <IconDelete></IconDelete>
            </SButton>
          </>
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <CheckBox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    tableHooks
  );

  const isEvent = (id) => id % 2 === 0;

  const { pageIndex, globalFilter } = state;
  //#endregion

  return (
    <>
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        {...getTableProps()}
        className="table table-lg table-dark striped bordered table-hover"
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  scope="col"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                /* className={isEvent(idx) ? "bg-green-400 bg-opacity-10" : ""} */
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-center mt-2">
        <button
          className="btn btn-dark m-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Anterior
        </button>
        <span className="text-white">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className="btn btn-dark"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Siguiente
        </button>
      </div>

      <pre>
        <code style={{ color: "white" }}>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>

        <Modal show={showDelete}>
          <Modal.Body>
            <div>
              <h4>¿Está seguro de eliminar este producto?</h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              disabled={loading}
              onClick={onHandleSubmitDelete}
            >
              {deleting ? <LoadingHandler /> : "Eliminar"}
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </Button>
            <Button variant="secondary" onClick={handleShowDelete}>
              Cerrar
            </Button>
            
          </Modal.Footer>
        </Modal>

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
    </>
  );
};

export default Table;
