import React from "react";


function Closebutton(props) {
  return (
    <div>
      <button
        className="button"
        type="button"
        style={{ backgroundColor: `rgb(225,255,255)` }}
        onClick={props.buttonHandler}
      >
        Close
      </button>
    </div>
  );
}

export default Closebutton;
