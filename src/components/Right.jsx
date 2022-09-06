import React from "react";

function Right(props) {

  let message = props.data === true
    ? "You have found one of 96 possible winning solutions."
    : "Place all eight queens onto the board with no two queens occupying the same row, column or diagonal.";

  return (
    <div>
       <div className="bottomBox">
          <div className="winningBox">
            {message}
          </div>
       </div>
    </div>
  );
}

export default Right;
