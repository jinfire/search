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
const StyledCard = styled(Card)(({color,borderColor}) => ({
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

const CustomCard = ({ color, borderColor, content, onClick}) => (
  <CardActionAreaActionArea onClick={onClick}>
  <StyledCard color={color} borderColor={borderColor}>
    <CardContentContent color={color}>
      <TypographyTitle variant="h3">{content}</TypographyTitle>
    </CardContentContent>
  </StyledCard>
  </CardActionAreaActionArea>
  );

export default function OutlinedCard({key,lines, sentence}) {
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
        <DialogContent dividers>
          <Typography gutterBottom>
              {curContent}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      
    </div>
  );
}