import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const FirstNameLoc=styled.div`
  position: absolute;
  width: 335px;
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
  width: 430px;
  left: 473px;
  top: 372px;
`;
const PasswordLoc=styled.div`
  position: absolute;
  width: 430px;
  height: 55px;
  left: 473px;
  top: 467px;
`;
const ConfirmPasswordLoc=styled.div`
  position: absolute;
  width: 430px;
  height: 55px;
  left: 473px;
  top: 562px;
`;
const EmailAddressLoc=styled.div`
  position: absolute;
  width: 430px;
  height: 58px;
  left: 473px;
  top: 657px;
`;
const coment=styled.div`
  position: absolute;
  width: 200px;
  height: 57px;
  left: 945px;
  top: 470px;
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
      <FirstNameLoc><TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth  /></FirstNameLoc>
      <LastNameLoc><TextField id="outlined-basic" label="Last Name" variant="outlined" /></LastNameLoc>
      <UserIdLoc><TextField id="outlined-basic" label="User ID" variant="outlined" fullWidth /></UserIdLoc>
      <PasswordLoc><TextField id="outlined-basic" label="Password" variant="outlined" fullWidth /></PasswordLoc>
      <ConfirmPasswordLoc><TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth /></ConfirmPasswordLoc>
      <EmailAddressLoc><TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth /></EmailAddressLoc>
    </form>
  );
}