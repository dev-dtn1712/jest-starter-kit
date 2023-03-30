import React, { useState } from 'react';
import Title from './components/Title';
import useDebounce from "./hooks/useDebounce";
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState("");
  const debounceTerms = useDebounce(searchValue, 1000);

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title>
          <p>Welcome</p>
        </Title>
      </header>

      <input type="text" onChange={onChangeInput} value={searchValue} />
      <p>{debounceTerms}</p>
    </div>
  );
}

export default App;
