import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginPage from "../LoginPage";

const PrivateRoute = ({ component: Component, oidc, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!oidc.user) {
          return <LoginPage />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  oidc: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    oidc: state.oidc
  };
}
export default connect(mapStateToProps)(PrivateRoute);
