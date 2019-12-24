import React from "react";
import ReactDOM from "react-dom";
import Home from "./containers/Home";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
