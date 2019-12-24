import React from "react";
import ReactDOM from "react-dom";
import Home from "./containers/home";
import { AppContextProvider } from "./context";

const App = () => (
  <AppContextProvider>
    <Home />
  </AppContextProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
