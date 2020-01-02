import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { AppContext, AppContextProvider } from "./context";
import { Background, Bookmarks, Time } from "./components";

function Home() {
  const { fetchBookmarks } = useContext(AppContext);
  useEffect(fetchBookmarks, []);

  return (
    <div id="home">
      <Background />
      <div id="scrollContainer">
        <Time />
        <Bookmarks />
      </div>
    </div>
  );
}

const App = () => (
  <AppContextProvider>
    <Home />
  </AppContextProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
