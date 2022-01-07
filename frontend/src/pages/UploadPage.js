import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ShareButton from './ShareButton';

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
const Logout=styled.div`
    position: absolute;
    width: 163px;
    height: 48px;
    left: 1287px;
    top: 47px;
    font-family: Prompt;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    color: #000000;
`;
const ImageInput=styled.div`
    position: absolute;
    width: 430px;
    height: 430px;
    left: 225px;
    top: 231px;
    background: #FFFFFF;
    border-radius:50%;
`;
const TextInput=styled.div`
    position: absolute;
    width: 520px;
    height: 174px;
    left: 780px;
    top: 487px;
    background: #FFFFFF;
    border-radius: 10px;
`;

const Explanation=styled.div`
    position: absolute;
    width: 527px;
    height: 45px;
    left: 493px;
    top: 779px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
`;
const SaveLocation=styled.div`
    position: absolute;
    width: 286px;
    height: 58px;
    left: 453px;
    top: 872px;
`
const ShareLocation=styled.div`
    position: absolute;
    width: 286px;
    height: 58px;
    left: 773px;
    top: 872px;
`

const UploadPage = () => {
    return (
        <Fix>
            <Logo>LOGO</Logo>
            <Home>HOME</Home>
            <Logout>Logout</Logout>
            <ImageInput></ImageInput>
            <TextInput>Text</TextInput>
            <Explanation>Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy</Explanation>
            <SaveLocation>
                <Button variant="contained" color="secondary">Save Profile Image</Button>
            </SaveLocation>
            <ShareLocation>
                <ShareButton/>
            </ShareLocation>
        </Fix>
    )
}

export default UploadPage
            