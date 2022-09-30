
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Container, Section } from '../../styles/globalStyles';
import {
    DataTableWrapper,
    DatatableTitle,
    ProdLink,
    ViewLink,
    DeleteButtom,
    TableButtomWrapper
  } from "./styles";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../../firebase";

const Datatable = (props) => {

  const handleDelete = async (id) => {
    try {
      alert(id)
      //setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <TableButtomWrapper>
            <ViewLink to="/users/test">
              Ver
            </ViewLink>
            <DeleteButtom
              className="deleteButton"
              onClick={() => handleDelete(params.row.id_cat)}
            >
              Borrar
            </DeleteButtom>
          </TableButtomWrapper>
        );
      },
    },
  ];
  return (
    <Section smPadding="50px 10px" inverse id="dataTable">
      <Container>
        <DataTableWrapper>
          <DatatableTitle>
            {props.name}
            <ProdLink to="/users/new">+ Producto</ProdLink>
          </DatatableTitle>
          <DataGrid
            getRowId={(row) => row.id_cat}
            rows={props.dataRows? props.dataRows :undefined}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              panel: { sx: {
                '& .MuiDataGrid-filterForm': {
                  bgcolor: 'inherit',
                },
                '& .MuiDataGrid-panelWrapper': {
                  bgcolor: '#a1a0a86b',
                },
              }},
            }}
            sx={{
              boxShadow: 7,
              border: "none",
              color:"inherit",
              //backgroundColor: 'rgba(20, 19, 19, 0.082)',
              "& .MuiButtonBase-root":{
                color: 'inherit'
              },
              "& .MuiTablePagination-root":{
                color: '#737278db'
              },
            }}
          />
        </DataTableWrapper>
      </Container>
    </Section>
  );
};

export default Datatable;
