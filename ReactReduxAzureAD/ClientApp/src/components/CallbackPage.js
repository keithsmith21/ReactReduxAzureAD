import React, { Component } from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import userManager from "../util/userManager";
import PropTypes from "prop-types";
import { push } from "react-router-redux";

class CallbackPage extends Component {
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => {
          this.props.dispatch(push("/"));
        }}
        errorCallback={error => {
          this.props.dispatch(push("/"));
          console.error(error);
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

CallbackPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(CallbackPage);
