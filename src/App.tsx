import './App.css';
import Selects from './Selects/Selects';
import { useState, useEffect } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { GoCheck } from 'react-icons/go';

function App() {
  type OptionType = {
    id: number;
    value: string;
    label: string;
  };

  const options: OptionType[] = [
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

  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(() => {
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

  const [selectionMode, setSelectionMode] = useState<'Single' | 'Multiple'>('Single');

  const [stateChange, setStateChange] = useState(false);

  const handleModeChange = (mode: 'Single' | 'Multiple') => {
    setSelectedOptions([]);
    setSelectionMode(mode);
  };
  
  const handleMouseOver = () => {
    setStateChange(true);
  };

  const handleMouseOut = () => {
    setStateChange(false);
  };

  return (
    <div className="App">
      <div className="mode-toggle__container"
      onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut}>
        <div className="mode-toggle__header">
          <h5>{selectionMode}</h5>
          {stateChange === false ? <BsChevronDown /> : <BsChevronUp />}
        </div>          
        <ul>
          <li
          onClick={() => handleModeChange('Single')}
          className={selectionMode === 'Single' ? 'active' : ''}>
            <span>Single</span>
            {selectionMode === 'Single' && <GoCheck />}
          </li>
          <li
          onClick={() => handleModeChange('Multiple')}
          className={selectionMode === 'Multiple' ? 'active' : ''}>
            <span>Multiple</span>
            {selectionMode === 'Multiple' && <GoCheck />}
            </li>
        </ul>
      </div>
      <Selects
      selectionMode={selectionMode}
      selectedOptions = {selectedOptions}
      setSelectedOptions = {setSelectedOptions}
      options = {options}/>
    </div>
  );
}

export default App;
