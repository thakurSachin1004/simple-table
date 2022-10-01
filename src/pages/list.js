import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchStocksData } from "./actions";
import StyledTable from "../common/StyledTable";
import { debounce } from "../common/debounce";

const StockList = () => {
  const [headers, setHeaders] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const createRowData = (rowData, columns) => {
    const data = rowData.map((elt, index) => {
      const cellData = elt.split(",");
      const colData = {};
      columns.map((header, i) => {
        colData[header.field] = cellData[i];
      });
      colData.id = index;
      return colData;
    });
    data.pop();
    setStocksData(data);
    setSearchedData(data);
  };

  const createTableData = (stocksData) => {
    if (stocksData && stocksData.length) {
      const columns = stocksData[0].split(",").map((elt) => {
        return { field: elt, headerName: elt, flex: 1 };
      });
      setHeaders(columns);
      createRowData(stocksData.slice(1), columns);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetchStocksData();
    setIsLoading(false);
    createTableData(data);
  };

  const handleSearch = (text) => {
    if (text.length == 0) {
      setSearchedData(stocksData);
      return;
    }
    const resultData = stocksData.filter((elt) => {
      if (elt && elt.Name) {
        if (elt.Name.trim().toLowerCase().includes(text.trim().toLowerCase())) {
          return elt;
        }
      }
      if (elt && elt.Symbol) {
        if (
          elt.Symbol.trim().toLowerCase().includes(text.trim().toLowerCase())
        ) {
          return elt;
        }
      }
    });
    setSearchedData(resultData);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "5%",
        transform: "translateX(-50%)",
        minHeight: "600",
        height: 800,
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ width: "600px", marginBottom: "16px", marginTop: "16px" }}
        placeholder="Search by symbol or name"
        type="search"
        onChange={(e) => {
          const fn = debounce(handleSearch, 800);
          fn(e.target.value);
        }}
      />
      <Typography
        component={"div"}
        sx={{
          textAlign: "left",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        {`${searchedData.length} Stocks`}
      </Typography>
      {isLoading ? (
        <CircularProgress
          sx={{ position: "relative", top: "50%", left: "50%" }}
        />
      ) : (
        <StyledTable
          rows={searchedData}
          columns={headers}
          onRowClick={(rowData) => {
            history.push(`/stocks/quotes/${rowData.row.Symbol}`);
          }}
        />
      )}
    </Box>
  );
};

export default StockList;
