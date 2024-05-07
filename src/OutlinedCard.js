import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function OutlinedCard({line}) {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          "{line}"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
