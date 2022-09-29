
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Container, Section } from '../../styles/globalStyles';
import {
    DataTableWrapper,
    DatatableTitle,
    ProdLink
  } from "./styles";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     // const fetchData = async () => {
  //     //   let list = [];
  //     //   try {
  //     //     const querySnapshot = await getDocs(collection(db, "users"));
  //     //     querySnapshot.forEach((doc) => {
  //     //       list.push({ id: doc.id, ...doc.data() });
  //     //     });
  //     //     setData(list);
  //     //     console.log(list);
  //     //   } catch (err) {
  //     //     console.log(err);
  //     //   }
  //     // };
  //     // fetchData();

  //     // LISTEN (REALTIME)
  //     const unsub = onSnapshot(
  //       collection(db, "users"),
  //       (snapShot) => {
  //         let list = [];
  //         snapShot.docs.forEach((doc) => {
  //           list.push({ id: doc.id, ...doc.data() });
  //         });
  //         setData(list);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );

  //     return () => {
  //       unsub();
  //     };
  //   }, []);

  const handleDelete = async (id) => {
    // try {
    //   await deleteDoc(doc(db, "users", id));
    //   setData(data.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <Section smPadding="50px 10px" inverse id="dataTable">
      <Container>
        <DataTableWrapper>
          <DatatableTitle>
            Productos
            <ProdLink to="/users/new">+ Producto</ProdLink>
          </DatatableTitle>
          <DataGrid
            rows={data}
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
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .MuiButtonBase-root":{
                color: 'inherit'
              },
            }}
          />
        </DataTableWrapper>
      </Container>
    </Section>
  );
};

export default Datatable;
