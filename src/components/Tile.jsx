import React from "react";
import Active from "./queen.svg";

function Tile(props) {

  function tileClicked(event) {
    props.cellClick(props.value);
  }


  return (
    <td
      className={props.style}
      onClick={tileClicked}
      key={props.value}>
      {props.toggle === 1 ? (<img src={Active}/>) : (<p>{props.value}</p>)}

    </td>
  );
}

export default Tile;
