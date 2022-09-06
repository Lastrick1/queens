import React, {useState} from "react";
import Row from "./Row";

function Board(props) {
  function range(start, end, inc) {
    var ans = [];
    for (let i = start; i >= end; i += inc) {
       ans.push(i);
    }
    return ans;
  }
  

  return (

      <table className = "board">
      <tbody>{range(8,1,-1).map((index) => {
        let thisRowIndex = index;
        let thisRowData  = props.data[index-1];
        let thisRowBlock = props.dBlocks[index-1];
        return (<Row key={index} data={thisRowData} bdata={thisRowBlock} cellClick={props.cellClick} rowIndex={thisRowIndex} />)
        })}
      </tbody>
      </table>

  );
}

export default Board;
