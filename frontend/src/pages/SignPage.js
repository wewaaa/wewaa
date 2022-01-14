import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';

const Fix=styled.div`
    width: 1920px;
    height: 1080px;
    background: #EFEFEF;
    text-align: center;
`;

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
const UserPasswordLoc=styled.div`
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


//업로드 페이지의 세이브로케이션과 하나의 컴포넌트로 묶는 방법을 공부해야함
const SaveLocation2=styled.div` 
    position: absolute;
    width: 286px;
    height: 58px;
    left: 613px;
    top: 770px;
`
const ConfirmLoc=styled.div`
    position: absolute;
    width: 186px;
    height: 58px;
    left: 900px;
    top: 380px;
`;
const CommentLoc=styled.div`
    position: absolute;
    width: 200px;
    height: 57px;
    left: 930px;
    top: 470px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;
    color: #000000;
`; 


function SignPage(){
    return (
        <Fix>
            <Header></Header>
            <form  noValidate autoComplete="off">
                <FirstNameLoc>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth  />
                </FirstNameLoc>
                <LastNameLoc>
                    <TextField id="" label="Last Name" variant="outlined" />
                </LastNameLoc>
                <UserIdLoc>
                    <TextField id="" label="User ID" variant="outlined" fullWidth />
                </UserIdLoc>
                <UserPasswordLoc>
                    <TextField id="" label="User Password" variant="outlined" fullWidth />
                </UserPasswordLoc>
                <ConfirmPasswordLoc>
                    <TextField id="" label="Confirm Password" variant="outlined" fullWidth />
                </ConfirmPasswordLoc>
                <EmailAddressLoc>
                    <TextField id="" label="Email Address" variant="outlined" fullWidth />
                </EmailAddressLoc>
                <ConfirmLoc>
                    <Button variant="contained" color="primary">Confirm</Button>
                </ConfirmLoc>
                <SaveLocation2>
                    <Button variant="contained" color="secondary">Save Profile Image</Button>
                </SaveLocation2>
            </form>
            <CommentLoc>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy</CommentLoc>
        </Fix> 
    )
}

export default SignPage
