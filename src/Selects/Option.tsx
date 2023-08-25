import React, { MouseEvent } from 'react';
import './Option.css';
import { SlClose } from 'react-icons/sl';

type Option = {
  id: number;
  value: string;
  label: string;
  deleteOption: (id: number) => void;
}

function Option(props: Option) {
  const handleDeleteOption = (event: MouseEvent<HTMLButtonElement>) => {
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
