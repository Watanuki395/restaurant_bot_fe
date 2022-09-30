    export const userColumns = [
    { field: "id_cat", headerName: "ID", width: 70 },
    {
        field: "name_cat",
        headerName: "Producto",
        width: 230,
        renderCell: (params) => {
        return (
            <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} />
            {params.row.name_cat}
            </div>
        );
        },
    },
    {
        field: "description_cat",
        headerName: "Descripción",
        width: 230,
    },
    ];
