import * as React from 'react';
import "./SelectBar.css"

const SelectBar = ({onclickSelectBar, state}) => {
    return (
      <div className='selectBarMain'>
          <span onClick={() => onclickSelectBar(1)} style={state === 1 ? {color: "green"}: {}}>목록</span>
          <span onClick={() => onclickSelectBar(2)} style={state === 2 ? {color: "green"}: {}}>요청</span>
          <span onClick={() => onclickSelectBar(3)} style={state === 3 ? {color: "green"}: {}}>수락</span>
          <span onClick={() => onclickSelectBar(4)} style={state === 4 ? {color: "green"}: {}}>차단</span> 
      </div>
    )
}

export default SelectBar;