import React, { Component } from "react";
import App from "../App";
import AppContext from "./AppContext";

export default class AppImpl extends Component {
  state = {
    isQualified: null,
  };

  setIsQualified = (isQualified?: boolean) => {
    this.setState({ isQualified });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          isQualified: this.state.isQualified,
          setIsQualified: this.setIsQualified,
        }}
      >
        <App />
      </AppContext.Provider>
    );
  }
}
