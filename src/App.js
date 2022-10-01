import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StockList from "./pages/list";
import Quotes from "./pages/quotes";
import { Redirect } from "react-router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={StockList} />
          <Route path="/stocks/quotes/:symbol" exact component={Quotes} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
