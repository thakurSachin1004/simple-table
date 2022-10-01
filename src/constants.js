export const QUOTES_HEADERS = [
  { field: "time", headerName: "Time", flex: 1 },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "valid_till", headerName: "Valid Till", flex: 1 },
];

export const BASE_URL = "https://prototype.sbulltech.com/api/v2";

export const ROUTES = {
  stockListRoute: "/instruments",
  quotesListRoute: "/quotes",
};
