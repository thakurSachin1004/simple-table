import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { fetchQuotesData } from "./actions";
import StyledTable from "../common/StyledTable";
import { QUOTES_HEADERS } from "../constants";

let timerId;

const Quotes = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { symbol } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetchQuotesData(symbol);
    if (data && data.success && data.payload[symbol]) {
      const dataWithId = data.payload[symbol].map((elt, index) => {
        return {
          ...elt,
          id: index,
        };
      });
      const sortedData = dataWithId.sort(
        (a, b) => Date.parse(a.valid_till) - Date.parse(b.valid_till)
      );
      const refetchTimestamp =
        Date.now() - Date.parse(sortedData[0].valid_till);
      timerId = setTimeout(fetchData, refetchTimestamp);
      setQuotesData(sortedData);
    } else if (!data.success) {
      alert(data.err_msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "5%",
        transform: "translateX(-50%)",
        minHeight: "600",
        height: 700,
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Button
          onClick={() => history.push("/")}
          variant="contained"
          sx={{ width: "10%", marginRight: "20px" }}
        >
          <ArrowBackIcon sx={{ marginRight: "10px" }} />
          Back
        </Button>
        <Typography
          component={"div"}
          sx={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          {`${symbol} Quotes`}
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress
          sx={{ position: "relative", top: "50%", left: "50%" }}
        />
      ) : (
        <StyledTable rows={quotesData} columns={QUOTES_HEADERS} />
      )}
    </Box>
  );
};

export default Quotes;
