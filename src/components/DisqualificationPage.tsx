import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function DisqualificationNotice() {
  const { disqualificationMessage } = useContext(AppContext);

  return (
    <div className="text-container">
      <p>{disqualificationMessage}</p>
      <p>
        Please contact customer service at 1-800-XXX-XXXX for further
        assistance.
      </p>
    </div>
  );
}
