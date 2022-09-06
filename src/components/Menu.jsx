import React from "react";
import Tile from "./Tile";

function range(start, end, inc) {
  var ans = [];
  for (let i = start; i < end; i += inc) {
     ans.push(i);
  }
  return ans;
}

function Menu(props) {

  function handleClick() {
    // check if queens on Board
    if (props.num < 8) {
      props.resetClick();
    }
  }

  return (
    <div>
      <div className="topBox">
        <div className="vertical-center">
          <button onClick={handleClick}>Reset Board</button>
        </div>
      </div>
      <div className="bottomBox">
        <table>
          <tbody>
            <tr>
              {range(0,4,1).map((i) => {
                let value = props.num >= 8 - i ? 1 : 0
                return <Tile style={"square big"} key={i} value={""} toggle={value} />
            })}</tr>
            <tr>
              {range(0,4,1).map((i) => {
                let value = props.num >= 4 - i ? 1 : 0
                return <Tile style={"square big"} key={i} value={""} toggle={value} />
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>);
}

export default Menu;
