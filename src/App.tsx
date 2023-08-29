import './App.css';
import Selects from './Selects/Selects';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { GoCheck } from 'react-icons/go';

function App() {
  const [selectionMode, setSelectionMode] = useState<'Single' | 'Multiple'>('Multiple');

  const [stateChange, setStateChange] = useState(false);

  const handleModeChange = (mode: 'Single' | 'Multiple') => {
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
      <Selects selectionMode={selectionMode} />
    </div>
  );
}

export default App;
