import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Card from './OutlinedCard';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import myImage from './logo192.png'; // 이미지를 import
import Typography from '@mui/material/Typography';

function App() {
  const [lines, setLines] = useState([]);
  const [indices, setIndices] = useState([]);
  const [fivelines, setFivelines] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false); // new state to track search attempts

  useEffect( () =>{
    fetch('/script_comments.txt')
    .then(response => response.text())
    .then(text => setLines(text.split('\n')));
  }, []);

  const handleSearch = (query) => {
    const trimQuery = query.trim();
    setSearchAttempted(true); // Set searchAttempted to true whenever a search is performed
    if(trimQuery === "") {
      setIndices([]);
      setFivelines([]);
      setSearchAttempted(false); // Reset on empty query
    } else {
      const words = trimQuery.toLowerCase().split(' ');
      const foundIndices = [];

      lines.forEach((line, i) => {
        if(words.every(word => line.toLowerCase().includes(word)))
          foundIndices.push(i);
      });

      if(foundIndices.length > 0) {
        const fivelinesarr = foundIndices.map((idx) => {
          const start = Math.max(0, idx-2);
          const end = Math.min(lines.length, idx+3);
          return lines.slice(start, end).join(' ');
        });
        setIndices(foundIndices);
        setFivelines(fivelinesarr);
      } else {
        setIndices([]);
        setFivelines([]);
      }
    }
  };


  return (
    <div className="App">
      <div className="image-container">
      <img src={myImage} alt="My Image" /> {/* 이미지를 추가 */}
      </div>
      <div className="search-container"> {/* SearchBar와 Card를 감싸는 div */}
      <SearchBar onSearch={handleSearch} />
      {searchAttempted && indices.length === 0 ? (
        <Typography variant="h4" color="textSecondary" style={{ opacity: 0.5 }}>
          Sorry... we can't find any example...
        </Typography>
      ) : (
        indices.map((idx, index) => (
          <Card key={idx} lines={lines} idx = {idx} fivelines ={fivelines[index]} />
        ))
      )}
      </div>
    </div>
  );
}

export default App;