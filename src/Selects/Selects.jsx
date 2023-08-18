import React, {useState, useEffect} from "react";
import {BsChevronDown, BsChevronUp} from 'react-icons/bs'
import {GoCheck} from 'react-icons/go'
import {VscClose} from 'react-icons/vsc'
import Option from './Option'
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

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem("selectedOptions");
    if (savedOptions) {
      try {
        return JSON.parse(savedOptions);
      } catch (error) {
        console.error("Error parsing saved options:", error);
        return [];
      }
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const [stateChange, setStateChange] = useState(false);

  const [valueAvailable, setAvailable] = useState(false);
  
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
    setAvailable(true);
    const option = {
      id: selectedValue.id,
      value: selectedValue.value,
      label: selectedValue.label,
    };
    const isOptionSelected = selectedOptions.some(
      (selectedOption) => selectedOption.id === option.id
    );
    if (isOptionSelected) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  const handleOptionClose = () => {
    setSelectedOptions([]);
    setAvailable(false);
  };

  const deleteOption = (id) => {
    setSelectedOptions(selectedOptions.filter((option) => option.id !== id));
  };

  return (
    <div className="select-container" >
      <span>
        Label
      </span>
      <div className="select-component">
        <div className="select-header" onClick={handleSelect}>
          <div className="select-values-container">
            {
              selectedOptions.map((singleOption) => 
                <Option 
                id = {singleOption.id}
                value = {singleOption.value}
                label = {singleOption.label}
                deleteOption = {deleteOption}
                />
              )
            }
          </div>
          <div className="select-header-btns">
            <div className="close btn">
              {valueAvailable === true ? <VscClose onClick={handleOptionClose}/> : ""}
            </div>
            <div className="expand btn">
              {stateChange === false ? <BsChevronDown /> : <BsChevronUp />}
            </div>
          </div>
        </div>          
        <ul style={isVisible}>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOptions.some((selectedOption) => selectedOption.id === option.id)
                  ? "selected"
                  : ""
              }
            >
              {option.label}
              {selectedOptions.some((selectedOption) => selectedOption.id === option.id) && (
                <GoCheck />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  )
  
}

export default Selects;
