import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const StyledTable = ({ rows, columns, onRowClick }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={20}
      onRowClick={onRowClick}
      rowsPerPageOptions={[20]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus": { outline: "none" },
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-row": {
          outline: "none",
          color: "#484848",
          fontSize: "15px",
          cursor: "pointer",
        },
        "& .MuiDataGrid-colCell:focus": {
          outline: "none",
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
          opacity: "0.7",
          color: "black",
          fontSize: "17px",
        },
      }}
      disableColumnMenu
    />
  );
};

export default StyledTable;
