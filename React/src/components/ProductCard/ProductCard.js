import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './ProductCardStyles';


export default function ProductCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Name: {props.data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Price: {props.data.price}
        </Typography>
        <Typography variant="body2" component="p">
          Description: {props.data.description}
        </Typography>
        <Typography variant="body2" component="p">
          Time: {props.data.inventoryTime}
        </Typography>
      </CardContent>
    </Card>
  );
}
