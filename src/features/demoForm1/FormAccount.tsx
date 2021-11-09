import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export interface IFormAccountProps {}
 

const useStyles = makeStyles(theme=>({
    root:{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        minHeight: '100vh'
    },

}))






export default function FormAccount (props: IFormAccountProps) {

    const classes = useStyles();
  return (
    <div>
      <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
            
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
            hi
        </Grid>
        
        </Grid>
      </Box>
    </div>
  );
}
