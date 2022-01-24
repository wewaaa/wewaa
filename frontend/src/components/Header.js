import React from 'react'
import styled from 'styled-components';
import { Route,Routes,Link} from 'react-router-dom';

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

const Header = () => {
    return (
        <>
            <Link to = "../" ><Logo>Drawa</Logo></Link>
        </>
    )
}

export default Header
