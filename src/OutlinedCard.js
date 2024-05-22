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

const CustomCard = ({ color, borderColor, content, onClick}) => (
  <CardActionAreaActionArea onClick={onClick}>
  <StyledCard color={color} borderColor={borderColor}>
    <CardContentContent color={color}>
      <TypographyTitle variant="h3">{content}</TypographyTitle>
    </CardContentContent>
  </StyledCard>
  </CardActionAreaActionArea>
  );

export default function OutlinedCard({lines, idx}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <CustomCard 
      onClick={handleClickOpen}
      color="#ffffff"
      borderColor="#87CEEB"
      content={lines[idx]}
    />
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Understanding the Context
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
              {lines}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      
    </div>
  );
}