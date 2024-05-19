import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import Color from "color"; // v3.2.1
import { styled } from "@mui/material/styles";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
  borderRadius: 16,
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.1)"
  } 
}));
const StyledCard = styled(Card)(({color,borderColor}) => ({
  minWidth: 256,
  borderRadius: 16,
  border : `2px solid ${borderColor}`,
  boxShadow: "none",
  "&:hover": {
    boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`
  }
}));
const CardContentContent = styled(CardContent)(({
  color
}) => {
  return {
    backgroundColor: color,
    padding: "1rem 1.5rem 1.5rem"
  };
});
const TypographyTitle = styled(Typography)(() => ({
  fontFamily: "Keania One",
  fontSize: "1.5rem",
  color: "#000"
}));

const CustomCard = ({ color, borderColor, content}) => (
  <CardActionAreaActionArea>
  <StyledCard color={color} borderColor={borderColor}>
    <CardContentContent color={color}>
      <TypographyTitle variant="h3">{content}</TypographyTitle>
    </CardContentContent>
  </StyledCard>
  </CardActionAreaActionArea>
  );

export default function OutlinedCard({lines, idx}) {
  const [curLineIdx, setCurLineIdx] = useState(idx);

  const handleNextClick = () => {
    setCurLineIdx(curLineIdx + 1);
  };

  const handlePrevClick = () => {
    setCurLineIdx(curLineIdx - 1);
  };
  return (
    <div>
    <CustomCard
      color="#ffffff"
      borderColor="#87CEEB"
      content={lines[curLineIdx]}
    />
    </div>
  );
}
