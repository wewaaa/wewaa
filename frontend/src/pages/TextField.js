import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const FirstNameLoc=styled.div`
    position: absolute;
    width: 281px;
    left: 473px;
    top: 275px;
    float: right;
`;
const LastNameLoc=styled.div`
    position: absolute;
    width: 281px;
    left: 850px;
    top: 275px;
`;
const UserIdLoc=styled.div`
    position: absolute;
    width: 600px;
    left: 473px;
    top: 372px;

`;
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FirstNameLoc><TextField id="outlined-basic" label="Input Adornments"  /></FirstNameLoc>
      <LastNameLoc><TextField id="outlined-basic" label="Outlined" variant="outlined" /></LastNameLoc>
      <UserIdLoc><TextField id="outlined-basic" label="Outlined" variant="outlined" /></UserIdLoc>
    </form>
  );
}