import React from 'react';
import './Option.css';
import { SlClose } from 'react-icons/sl';

function Option(props) {
  const handleDeleteOption = (event) => {
    event.stopPropagation();
    props.deleteOption(props.id);
  };

  return (
    <div className="option">
      <div className="option-info">
        <h5>{props.label}</h5>
      </div>
      <button className="delete btn" onClick={handleDeleteOption}>
        <SlClose />
      </button>
    </div>
  );
}

export default Option;
