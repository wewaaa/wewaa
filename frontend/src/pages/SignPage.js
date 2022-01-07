import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from './TextField';


// header를 어떻게 하나의 컴퍼넌트로 정리할지 공부해야됨
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
//업로드 페이지의 세이브로케이션과 하나의 컴포넌트로 묶는 방법을 공부해야함
const SaveLocation2=styled.div` 
    position: absolute;
    width: 286px;
    height: 58px;
    left: 613px;
    top: 856px;
`
const SignPage = () => {
    return (
        <Fix>
            <Logo>LOGO</Logo>
            <Home>HOME</Home>
            <SaveLocation2>
                <Button variant="contained" color="secondary">Save Profile Image</Button>
            </SaveLocation2>
            <form  noValidate autoComplete="off">
            <TextField></TextField>
            </form>
        </Fix>
        
    )
}

export default SignPage
