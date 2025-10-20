import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./history/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </HistoryRouter>
  </React.StrictMode>
);
