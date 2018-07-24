import * as React from "react";
import * as ReactDOM from "react-dom";
import toastr from "toastr";
import { createBrowserHistory } from "history";

import Main from "./main";
import configureStore from "./store/configure";

import "toastr/build/toastr.min.css";
import "./styles/bootstrap/css/bootstrap-theme-slate.min.css";
import "./styles/styles.css";

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Main store={store} history={history} />,
  document.getElementById("root")
);
