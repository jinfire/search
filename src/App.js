import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Card from './OutlinedCard';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import myImage from './logo192.png'; // 이미지를 import
import CustomizedDialogs from './Dialog';

function App() {
  const [lines, setLines] = useState([
    "emma home was the one i could be more",
    "vulnerable with nothing has ever",
    "happened romantically with us we just",
    "love each other let's be honest though",
    "we'll probably be shipping these two"
  ]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // 함수를 이용하여 다음 검색 결과 보여주기
  const handleNext = () => {
    // 구현 내용은 여기에 추가하세요
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  // 함수를 이용하여 이전 검색 결과 보여주기
  const handlePrev = () => {
    console.log("prev");
    // 구현 내용은 여기에 추가하세요
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  };

  const handleSearch = (query) => {
    const trimQuery = query.trim();
    if(trimQuery === "") {
      console.log("검색어를 입력해주세요");
    } else {
      const words = trimQuery.toLowerCase().split(' ');
      const index = lines.findIndex(line => {
        // 모든 단어가 현재 line에 포함되어 있는지 확인
        return words.every(word => line.toLowerCase().includes(word));
      });
      if(index !== -1){
        setCurrentLineIndex(index);
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
      {lines.length > 0 && (
      <Card lines={lines} idx ={currentLineIndex} />
      )}
      <CustomizedDialogs/>
      </div>
    </div>
  );
}

export default App;