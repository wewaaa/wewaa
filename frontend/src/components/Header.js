import React from 'react'
import styled from 'styled-components';

const Logo=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 5vh;
    font-family: Poppins;
    font-weight: bold;
    font-size: 1.5rem;
    color: #ffffff;
`;

const Line=styled.div`
    position: absolute;
    width: 100%;
    height: 0px;
    top: 4rem;
    border: 1px solid #FFFFFF;
`;

const Header = () => {
    return (
        <>
            <Logo>Drawa</Logo>
        </>
    )
}

export default Header
