import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";

export default function OutlinedCard({lines, idx}) {
  const [curLineIdx, setCurLineIdx] = useState(idx);

  const handleNextClick = () => {
    setCurLineIdx(curLineIdx + 1);
  };

  const handlePrevClick = () => {
    setCurLineIdx(curLineIdx - 1);
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          "{lines[curLineIdx]}"
        </Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
      {curLineIdx > 0 ? (
      <Button onClick={handlePrevClick} endIcon={<ChevronLeftRounded />} size="small">Prev</Button>
      ) : null} 
      {curLineIdx < lines.length - 1 ? (
      <Button onClick={handleNextClick} endIcon={<ChevronRightRounded />} size="small">Next</Button>
      ) : null}
      </div>
    </Card>
  );
}
