import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ShareButton from './ShareButton';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import axios from "axios";


const Fixed=styled.div`
    position: absolute;
    width: 1920px;
    height: 1080px;
    background: #5F5F5F;
    background-color: rgba( 138, 138, 138, 0.6);
    z-index: 1;
    `
const ModalContainer=styled.div`
    position: absolute;
    width: 775px;
    height: 734px;
    left: 572px;
    top: 162px;
    background: #FFFFFF;
    border-radius: 10px;
`;
const ImageBox=styled.div`
    position: absolute;
    width: 331px;
    height: 331px;
    left: 219px;
    top: 98px;    
    background: black;
    border-radius: 20px;
`;
const ExplainBox=styled.div`
    position: absolute;
    width: 434px;
    height: 45px;
    left: 168px;
    top: 489px;
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
    const[image,setImages]=useState([]);

    useEffect(()=>{
        const getImage =async ()=>{
            let response
            try{
                    response = (await axios.get(
                    'https://주소/주소/주소/주소/',{responseType:'blob'}
                    )).data;
                    setImages(response)
            }
            catch(e){
                alert('오류 발생!')
            }
            return URL.createObjectURL(response)
        }
        getImage();
    },[]);
    

    return (
        <Fixed>
            <ModalContainer>
                    <button onClick= {()=> closeModal(false)}> X </button>
                    <ImageBox></ImageBox>
                    <ExplainBox>
                        <p>{image}</p>
                    </ExplainBox>
                    <ButtonBox>
                        <button>Save Profile Image</button><button>Share Image</button>
                    </ButtonBox>
            </ModalContainer>
        </Fixed>
    )
}

export default Modal
