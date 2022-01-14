import React from 'react'
import styled from 'styled-components';
const Logo=styled.div`
    position: absolute;
    width: 105px;
    height: 37px;
    left: 940px;
    top: 26px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;
    color: #000000;
`;
const Line=styled.div`
    position: absolute;
    width: 1413px;
    height: 0px;
    left: 217px;
    top: 94px;
    border: 1px solid #FFFFFF;
`;
const Header = () => {
    return (
        <>
            <Logo>Drawa</Logo>
            <Line></Line>
        </>
    )
}

export default Header
