import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Card from './OutlinedCard';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import logo from './logo4.PNG'; // 이미지를 import
import Typography from '@mui/material/Typography';

function App() {
  const [lines, setLines] = useState([]);
  const [indices, setIndices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
      setSearchResults([]);
      setSearchAttempted(false); // Reset on empty query
    } else {
      const results = lines.reduce((acc, line) => {
        const sentences = line.split('.').map(sentence => sentence.trim());
        const matchingSentences = sentences.filter(sentence => sentence.toLowerCase().includes(trimQuery));
        if (matchingSentences.length > 0) {
          console.log("line: ", line);
          console.log("matchingSentences: ", matchingSentences);
          acc.push({ line, sentences: matchingSentences });
        }
        return acc;
      }, []);
      setSearchResults(results);
    }
  };


  return (
    <div className="App">
      <div className="image-container">
      <img src={logo} alt="My Image" /> {/* 이미지를 추가 */}
      </div>
      <div className="search-container"> {/* SearchBar와 Card를 감싸는 div */}
      <SearchBar onSearch={handleSearch} />
      {searchAttempted && searchResults.length === 0 ? (
        <Typography variant="h4" color="textSecondary" style={{ opacity: 0.5 }}>
          Sorry... we can't find any example...
        </Typography>
      ) : (
        searchResults.map((result, index) => {
          console.log(`result ${index}:`, result);
          console.log('index', index);
          return <Card key={index} lines={result.line} idx = {result.sentences[index]} />
          })
      )}
      </div>
    </div>
  );
}

export default App;