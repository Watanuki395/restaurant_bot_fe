import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable, usePagination, useSortBy, useGlobalFilter, useRowSelect } from "react-table";
import { productoByCategoryRequested } from "../../../actions/productbycategoryAction";
import Filter from "./Filter";
import { CheckBox } from "./CheckBox";

import { IconDelete, IconEdit, IconSee, SButton } from "../../categories/style";
import ModalEdit from "../Modals/ModalEdit";


const Table = ({data, columns}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //let categorias = useSelector((state) => state.entries.categories ? state.entries.categories.categories : null);


  const redirectProductByCategory = (idCategory) => {
    let id_cat = idCategory.id_cat;
    dispatch(productoByCategoryRequested({ id_user: 68, id_cat }));
    navigate(`/CategoryByProduct/${idCategory.id_cat}`, { replace: true });
  };
  
  //#region DELETE
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  
  let initialValuesDelete = {
    id_cat: null,
  };
  const confirmDelete = (id_cat) => {
    setFormValue({ id_cat });
    handleShowDelete();
  };
  const [formValue, setFormValue] = useState(initialValuesDelete);
  const { id_cat } = formValue;

  const onChangeForm = (e) => {
    let { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  //#endregion

  const [modalEdit, setModalEdit] = useState(false);

  
  const Edit = obj => {
    setModalEdit(true);
    <ModalEdit 
    obj = { obj }
    estado = {modalEdit}
    setEstado = {setModalEdit}
    ></ModalEdit>
  }

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
              /* className={isEvent(row.id) ? "bg-green-400" : ""} */
              onClick={() => Edit(row.original)}
              //onClick={() => <ModalEdit obj = { row.original }></ModalEdit>}
            >
              <IconEdit></IconEdit>
            </SButton>

            <SButton
              className=""
              onClick={() => confirmDelete(row.original.id_cat)}
            >
              {/* <SButton className="" onClick={()=> dispatch(deleteProductAction(row.original.id_cat))}> */}
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
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
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
      ])
    },
    tableHooks,
  );

  const isEvent = (id) => id % 2 === 0;

  const { pageIndex, globalFilter } = state;

    return ( 
        <>
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()} className="table table-lg table-dark striped bordered table-hover">
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col">
                    {column.render("Header")}
                    <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔼' : ' 🔽') : ''}
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
          <code style={{color: "white"}}>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original)
              },
              null,
              2
            )}
          </code>
        </pre>
        </>
        
     );
}
 
export default Table;