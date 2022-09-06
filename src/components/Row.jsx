import React from "react";
import Tile from "./Tile";

function Row(props) {
  function range(start, end, inc) {
    var ans = [];
    for (let i = start; i <= end; i += inc) {
       ans.push(i);
    }
    return ans;
  }
  

  if (props.rowIndex % 2 === 0) {
    return (
      <tr>
        {range(1,8,1).map((index) => {
          let value = props.data[index-1];
          let bvalue = props.bdata[index-1];
          let thisStyle = index % 2 === 0  ? "square dark" : "square light";
          if (bvalue === 1 && value === 0) {thisStyle = "square blocked";}
          let colRow = String.fromCharCode(index + 96) + props.rowIndex.toString();
          return <Tile style={thisStyle} key={index} value={colRow} toggle={value} cellClick={props.cellClick} />
        })}
      </tr>
    )} else {
    return (
      <tr>
        {range(1,8,1).map((index) => {
          let value = props.data[index-1];
          let bvalue = props.bdata[index-1];
          let thisStyle = index % 2 === 0  ? "square light" : "square dark";
          if (bvalue === 1 && value === 0) {thisStyle = "square blocked";}
          let colRow = String.fromCharCode(index + 96) + props.rowIndex.toString();
          return <Tile style={thisStyle} key={index} value={colRow} toggle={value} cellClick={props.cellClick} />
        })}
      </tr>
    )
  }
}

export default Row;
