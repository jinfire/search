import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Color from "color"; // v3.2.1
import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.1)"
  } 
}));
const StyledCard = styled(Card)(({color,borderColor, theme}) => ({
  minWidth: 1016,
  borderRadius: 16,
  border : `2px solid ${borderColor}`,
  boxShadow: "none",
  "&:hover": {
    boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`
  },
  [theme.breakpoints.down('sm')]: {  // 600px 이하에서 적용될 스타일
    minWidth: '100%',  // 모바일 화면에서는 카드의 너비를 화면 너비에 맞춤
    margin: theme.spacing(1)  // 마진 추가
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
  color: "#000",
  textAlign: "center"
}));

const CustomCard = ({ color, borderColor, content, onClick, query}) => {
  console.log("query: ", query);
  const highlightedContent = content.split(query).reduce((prev, current, index, array) => {
    if (index < array.length - 1) {
      return prev + current + `<span style="background-color: yellow;">${query}</span>`;
    } else {
      return prev + current;
    }
  }, "");

  return (
    <CardActionAreaActionArea onClick={onClick}>
      <StyledCard color={color} borderColor={borderColor}>
        <CardContentContent color={color}>
          <TypographyTitle variant="h3" dangerouslySetInnerHTML={{ __html: highlightedContent }} />
        </CardContentContent>
      </StyledCard>
    </CardActionAreaActionArea>
  );
};

const highlightQuery = (text, query) => {
  const regex = new RegExp(`(${query})`, 'gi'); // 'g' for global, 'i' for case insensitive
  return text.replace(regex, `<span style="background-color: yellow;">$1</span>`);
};

const CustomDialogContent = ({ curContent, query }) => {
  const highlightedContent = highlightQuery(curContent, query);

  return (
    <DialogContent dividers>
      <Typography gutterBottom dangerouslySetInnerHTML={{ __html: highlightedContent }} />
    </DialogContent>
  );
};

export default function OutlinedCard({key,lines, sentence, query}) {
  const [open, setOpen] = React.useState(false);
  const [curContent, setContent] = React.useState('');

  const handleClickOpen = () => {
    setContent(lines);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <CustomCard 
      key={key}
      onClick={handleClickOpen}
      color="#ffffff"
      borderColor="#87CEEB"
      content={sentence}
      query={query}
    />
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Full Text
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <CustomDialogContent
          curContent={curContent}
          query={query}
        />
      </BootstrapDialog>
      
    </div>
  );
}