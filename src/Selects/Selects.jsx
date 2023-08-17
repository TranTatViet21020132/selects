import React, {useState, useEffect} from "react";
import {BsChevronDown, BsChevronUp} from 'react-icons/bs'
import {GoCheck} from 'react-icons/go'
import './Selects.css'

const Selects = () => {
  const options = [
    { id: 1, value: 'Chocolate', label: 'Chocolate' },
    { id: 2, value: 'Strawberry', label: 'Strawberry' },
    { id: 3, value: 'Vanilla', label: 'Vanilla' },
    { id: 4, value: 'Coffee', label: 'Coffee' },
    { id: 5, value: 'Tea', label: 'Tea' },
    { id: 6, value: 'Apple', label: 'Apple' },
    { id: 7, value: 'Peanut', label: 'Peanut' },
    { id: 8, value: 'Butter', label: 'Butter' },
    { id: 9, value: 'Honey', label: 'Honey' },
    { id: 10, value: 'Milk', label: 'Milk' },
    { id: 11, value: 'Matcha', label: 'Matcha' },
    { id: 12, value: 'Cake', label: 'Cake' },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);
  

  const [headerChange, setHeaderChange] = useState(options[0].label);

  const [stateChange, setStateChange] = useState(false);
  
  const [isVisible, setVisible] = useState(
    {
      visibility: 'hidden',
      opacity: 0
    }
  );

  const handleSelect = () => {
    setStateChange(!stateChange);
    setVisible(isVisible => ({
      ...isVisible,
      visibility: stateChange ? "hidden" : "visible",
      opacity: stateChange ? 0 : 1
    }));
  };

  const handleOptionClick = (selectedValue) => {
    setSelectedOption(selectedValue);
    setHeaderChange(options.find(option => option.value === selectedValue).label);
    handleSelect();
  };

  return (
    <div className="select-container">
      <span>
        Label
      </span>
      <div className="select-component">
        <div className="select-header" onClick={handleSelect}>
          <h5>{headerChange}</h5>
          {stateChange === false ? <BsChevronDown /> : <BsChevronUp />}
        </div>          
        <ul style={isVisible}>
          {options.map((option) => (
            <li 
            key={option.value}
            onClick={() => handleOptionClick(option.label)}
            className={selectedOption === option.value ? "selected" : ""}
            >
              {option.label}
              {selectedOption === option.value && <GoCheck />}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  )
  
}

export default Selects;
