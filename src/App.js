import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Card from './OutlinedCard';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import myImage from './logo192.png'; // 이미지를 import
import Typography from '@mui/material/Typography';

function App() {
  const [lines, setLines] = useState([
    "I'm very excited to tell you that on our",
    "couch tonight we have a record holder",
    "yes we do that record holder is Ace of",
    "Butterfield now ASAP no you I mean you",
    "are a record order aren't you oh I don't",
    "know yeah I guess now that's what I've",
    "been told",
    "well he's very fast at doing something",
    "any guesses Andrew",
    "I'll stop you",
    "one of the things you're very faster",
    "right um so I can neither of them are at",
    "all useful I can clap very fast",
    "take that audience someone",
    "to say I'm better at clapping than the",
    "audience",
    "and then I can type the alphabet very",
    "fast as well which came about really",
    "weirdly but now when you say very fast",
    "tell us what's your best time my best",
    "time for typing the alphabet is 1.97",
    "seconds wow",
    "and what's the world record I think it's",
    "under one second yeah",
    "what a waste of time be oh I know I know",
    "it's a record attempt we're going for a",
    "record of 10",
    "because there is actually they've said",
    "there is a kind of a website they've set",
    "this up where there's a clock the",
    "alphabet and as you type the thing the",
    "alphabet lights up I I had one uh my",
    "brother showed me it yes we've got it so",
    "can you show us on this I can yeah it's",
    "the same one well I don't know well it",
    "was called like you're bringing your",
    "drinks with you",
    "okay so it's all there okay so basically",
    "you start typing and the the clock",
    "starts okay cheers see when I did this",
    "the game was called finger frenzy okay",
    "we would ask what you were Googling when",
    "you found it",
    "this is good okay okay come on",
    "[Applause]",
    "here we go",
    "try it again reset reset reset the mouse",
    "but reset reset reset all right the",
    "first try okay okay there's nerves",
    "there's nerves it's a different keyboard",
    "like it's the best stuff best best of",
    "twenty",
    "yes oh",
    "it's this game I need finger Frenzy",
    "yeah",
    "all right well let's try fast clapping",
    "then",
    "I have no idea what this is I watched a",
    "video on YouTube of someone who actually",
    "holds the world record again I gained",
    "all these things off YouTube It's",
    "amazing yeah um and so there's a",
    "technique most people clap like this yes",
    "it's the usual thing but if you sort of",
    "flex",
    "like this",
    "and then it starts to speed up",
    "oh",
    "wow",
    "I would just saying to enjoy this time",
    "because now you can legally drink these",
    "games are over for you",
    "but before last time on YouTube learning",
    "how to clap fast I promise",
  ]);
  const [indices, setIndices] = useState([]);
  const [fivelines, setFivelines] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false); // new state to track search attempts

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