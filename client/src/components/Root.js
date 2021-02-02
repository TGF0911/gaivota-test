import "react-hot-loader/patch";
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "../routes/home";
import Details from "../routes/details"
import Offer from "../routes/offers"

const Root = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/app/home" component={Home} />
      <Route path="/app/offer/" component={Offer} />
      <Route path="/app/details/:id" component={Details} />
    </BrowserRouter>
  );
};

export default Root;
