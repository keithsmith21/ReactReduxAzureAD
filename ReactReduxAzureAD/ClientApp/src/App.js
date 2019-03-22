import React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import PrivateRoute from "./components/common/PrivateRoute";
import CallbackPage from "./components/CallbackPage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="/counter" component={Counter} />
      <Route path="/login" component={LoginPage} />
      <Route path="/logout" component={LogoutPage} />
      <PrivateRoute path="/fetchdata/:startDateIndex?" component={FetchData} />
    </Switch>
  </Layout>
);
