import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ShareButton from './ShareButton';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';

const Fixed=styled.div`
    position: relative;
    width: 1512px;
    height: 982px;
    background: #5F5F5F;
    background-color: rgba( 138, 138, 138, 0.6);
    `
const ModalContainer=styled.div`
    position: absolute;
    width: 775px;
    height: 734px;
    left: 359px;
    top: 160px;
    background: #FFFFFF;
    border-radius: 10px;
`;
const ImageBox=styled.div`
    position: absolute;
    width: 331px;
    height: 331px;
    left: 222px;
    top: 82px;
    background: black;
    border-radius: 20px;
`;
const ExplainBox=styled.div`
    position: absolute;
    width: 434px;
    height: 45px;
    left: 171px;
    top: 473px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
`;
const ButtonBox=styled.div`
    position: absolute;
    width: 606px;
    height: 58px;
    left: 85px;
    top: 561px;

`;



function Modal({closeModal}) {

    return (
        <Fixed>
            <ModalContainer>
                    <button onClick= {()=> closeModal(false)}> X </button>
                    <ImageBox/>
                    <ExplainBox>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </ExplainBox>
                    <ButtonBox>
                        <button>Save Profile Image</button><button>Share Image</button>
                    </ButtonBox>
            </ModalContainer>
        </Fixed>
    )
}

export default Modal
