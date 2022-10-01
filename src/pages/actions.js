import { BASE_URL, ROUTES } from "../constants";

const { stockListRoute, quotesListRoute } = ROUTES;

export const fetchStocksData = async () => {
  try {
    const target = `${BASE_URL}${stockListRoute}`;
    const res = await fetch(target, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });
    const data = await res.text();
    return data.split("\n");
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuotesData = async (quote) => {
  try {
    const target = `${BASE_URL}${quotesListRoute}/${quote}`;
    const res = await fetch(target);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
