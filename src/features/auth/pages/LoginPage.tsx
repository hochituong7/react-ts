import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) =>({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    box:{
        padding: theme.spacing(3)
    }
}));

export default function LoginPage () {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging);


    const handleLoginClick = () =>{
        //TODO: Get username + password from login form
        dispatch(authActions.login({
            username: '',
            password: '',
        }))
    }

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
          <Typography variant="h5" component="h1">Account Login</Typography>
          <Box mt={4}>
              <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
                Login &nbsp; {isLogging && <CircularProgress  size={10} color="inherit"/>}
              </Button>
          </Box>
      </Paper>
    </div>
  );
}
