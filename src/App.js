import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Card from './OutlinedCard';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import myImage from './logo192.png'; // 이미지를 import

function App() {
  const [lines, setLines] = useState([
    "emma home was the one i could be more",
    "vulnerable with nothing has ever",
    "happened romantically with us we just",
    "love each other let's be honest though",
    "we'll probably be shipping these two"
  ]);
  const [indices, setIndices] = useState([]);
  const [fivelines, setFivelines] = useState([]);

  const handleSearch = (query) => {
    const trimQuery = query.trim();
    if(trimQuery === "") {
      console.log("검색어를 입력해주세요");
    } else {
      const words = trimQuery.toLowerCase().split(' ');
      const foundIndices = [];

      lines.forEach((line,i) => {
        if(words.every(word =>line.toLowerCase().includes(word)))
          foundIndices.push(i);
      });

      if(foundIndices.length> 0) {
        const fivelinesarr = foundIndices.map((idx) => {
          const start = Math.min(0,idx-2);
          const end = Math.max(lines.length,idx+2);
          return lines.slice(start,end).join(' ');
      });
        setIndices(foundIndices);
        setFivelines(fivelinesarr);
        console.log("idx:", foundIndices);
        console.log("fivelines:", fivelinesarr);
        } else {
        console.log("검색어를 찾을 수 없습니다");
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
      {indices.length > 0 && (
        indices.map((idx,index) => (
          <Card key={idx} lines={lines} idx = {idx} fivelines ={fivelines[index]} />
        ))
      )}
      </div>
    </div>
  );
}

export default App;