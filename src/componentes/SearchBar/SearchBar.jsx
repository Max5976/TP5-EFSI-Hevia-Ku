import { useState } from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch, onClear }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar película o serie..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
      {inputValue && <button onClick={handleClear}>Limpiar</button>}
    </div>
  );
};