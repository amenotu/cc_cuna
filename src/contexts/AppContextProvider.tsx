import React, { Component } from "react";
import App from "../App";
import AppContext from "./AppContext";

export default class AppImpl extends Component {
  state = {
    isQualified: undefined,
    disqualificationMessage: undefined,
  };

  setIsQualified = (isQualified?: boolean) => {
    this.setState({ isQualified });
  };

  setDisqualificationMessage = (disqualificationMessage?: string) => {
    this.setState({ disqualificationMessage });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          isQualified: this.state.isQualified,
          setIsQualified: this.setIsQualified,
          disqualificationMessage: this.state.disqualificationMessage,
          setDisqualificationMessage: this.setDisqualificationMessage,
        }}
      >
        <App />
      </AppContext.Provider>
    );
  }
}
