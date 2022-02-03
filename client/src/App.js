import Axios  from "axios";
import React from "react";
import Router from "./Router";
import "./style/index.scss";

Axios.defaults.withCredentials = true;

const App = () => {
  return <div className="container"><Router /></div>;
}

export default App;
