import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Fix=styled.div`
    width: 1512px;
    height: 982px;
    background: #EFEFEF;
    text-align: center;
`;
const Logo=styled.div`
    position: absolute;
    width: 125px;
    height: 56px;
    left: 694px;
    top: 43px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    color: #000000;
`;
const Home=styled.div`
    position: absolute;
    width: 79px;
    height: 48px;
    left: 1150px;
    top: 47px;
    font-family: Prompt;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
`;
const LoginBox=styled.div`
    position: absolute;
    width: 520px;
    height: 522px;
    left: 498px;
    top: 230px;
    background: #DFDFDF;
    mix-blend-mode: normal;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`;
const LoginLogo=styled.div`
    position: absolute;
    width: 300px;
    height: 80px;
    left: 110px;
    top: 57px;
    font-family: Prompt;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 91px;
    color: #000000;
`;
const IdLoc=styled.div`
    position: absolute;
    width: 430px;
    left: 45px;
    top: 181px;
`;
const PasswordLoc=styled.div`
    position: absolute;
    width: 430px;
    height: 58px;
    left: 45px;
    top: 270px;
`;
const LoginLoc=styled.div`
    position: absolute;
    width: 430px;
    left: 45px;
    top: 350px;
`;
const Line=styled.div`
    position: absolute;
    width: 430px;
    height: 0px;
    left: 45px;
    top: 440px;
    border: 1px solid #4A4A4A;
`;

const SigninLoc=styled.div`
    position: absolute;
    width: 150px;
    height: 19px;
    left: 185px;
    top: 459px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #4A4A4A;
`;


const LoginPage = () => {
    return (
        <Fix>
            <Logo>LOGO</Logo>
            <Home>HOME</Home>
            <LoginBox>
                <LoginLogo>LOG IN</LoginLogo>
                <IdLoc>
                    <TextField id="" label="ID" variant="outlined" fullWidth />
                </IdLoc>
                <PasswordLoc>   
                    <TextField id="" label="Password" variant="outlined" fullWidth />
                </PasswordLoc>
                <LoginLoc>
                    <Button variant="contained" color="secondary" fullWidth>Log in</Button>
                </LoginLoc>
                <Line/>
                <SigninLoc>Create account</SigninLoc>
            </LoginBox>
            
            
        </Fix>
    )
}

export default LoginPage
