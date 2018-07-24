import { Store } from "redux";
import { History } from "history";
import { ApplicationState } from "./root";

let configure;

if (process.env.NODE_ENV === "production") {
  configure = require("./configure.prod").default;
} else {
  configure = require("./configure.dev").default;
}

export default configure;
