import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ShareButton from '../components/ShareButton';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Modal from '../components/Modal';
import Header from '../components/Header';


const Fix=styled.div`
    width: 1920px;
    height: 1080px;
    background: #EFEFEF;
    text-align: center;
`;

const BackCircle1=styled.div`
    position: absolute;
    width: 425px;
    height: 406px;
    left: 104px;
    top: 148px;
    background: #FF5E6C;
    border-radius: 50%;
`;
const BackCircle2=styled.div`
    position: absolute;
    width: 279px;
    height: 266px;
    left: 330px;
    top: 94px;
    background: #E5E5E5;
    border-radius: 50%;
    
`;
const BackCircle3=styled.div`
    position: absolute;
    width: 273px;
    height: 270px;
    left: 1297px;
    top: 325px;
    background: #E5E5E5;
    border-radius: 50%;
`;
const BackCircle4=styled.div`
    position: absolute;
    width: 66px;
    height: 65px;
    left: 1693px;
    top: 260px;
    background: #FFFFFF;
    border-radius: 50%;
`;
const BackCircle5=styled.div`
    position: absolute;
    width: 66px;
    height: 65px;
    left: 1066px;
    top: 755px;
    background: #FFFFFF;
    border-radius: 50%;
`;
const WriteLogo=styled.div`
    position: absolute;
    width: 367px;
    height: 194px;
    left: 1413px;
    top: 393px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 100px;
    line-height: 150px;
    color: #FF5E6C;
`;
const ImageInput=styled.div`
    position: absolute;
    width: 636px;
    height: 610px;
    left: 271px;
    top: 260px;
    background: #FFFFFF;
    border-radius: 20px;
`;
const TextInput=styled.div`
    position: absolute;
    width: 681px;
    height: 226px;
    left: 1040px;
    top: 514px;
    background: #FFFFFF;
    border-radius: 10px;
`;

const Explanation=styled.div`
    position: absolute;
    width: 681px;
    height: 75px;
    left: 1045px;
    top: 755px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    `;
const StyledButton = withStyles({
    root: {
      position: 'absolute',
      width: '286px',
      height: '58px',
      left: '850px',
      top: '961px',
      background: 'black',
      borderRadius: 3,
      border: 0,
      color: 'white',
      padding: '0 30px',
      fontSize:'24px'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  const StyledLinearProgress = withStyles({
    root: {
      height: 8,
      background:'#C4C4C4',
      position: 'fixed' ,
      bottom: 0,
      width:'100%',
      zIndex:'99'
    },
    bar:{
        background:"#000000"
    },
  })(LinearProgress);
  

function UploadPage(){
    const [openModal,setOpenModal]=useState(false);
    const StartSwitch = ()=>{
        if(openModal===false){
            setOpenModal(true);
        }
    }
    return (
        <Fix>
            <Header></Header>
            <BackCircle1/><BackCircle2/><BackCircle3/><BackCircle4/><BackCircle5/>
            <ImageInput></ImageInput>
            <WriteLogo>Write</WriteLogo>
            <TextInput>
                <input className='TextInput'></input>
            </TextInput>
            <StyledButton variant="contained" onClick={StartSwitch}>
                Done
            </StyledButton>
            <Explanation>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy
            </Explanation>
            {openModal ? <StyledLinearProgress/>:<></>}
            {openModal ? <Modal closeModal={setOpenModal}/>:<></>}
        </Fix>
    )
}

export default UploadPage
            