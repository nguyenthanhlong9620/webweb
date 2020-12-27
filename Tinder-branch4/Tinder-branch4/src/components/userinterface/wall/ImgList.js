import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '40vw',
  },
}));

export default function ImgList({dbPost}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.root} cols={3}>
        {dbPost.map((img) => (
          <GridListTile key={img}>
            <img src={img.photo_name}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
