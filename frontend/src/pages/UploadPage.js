import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ShareButton from './ShareButton';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Modal from './Modal';



const Fix=styled.div`
    width: 1512px;
    height: 982px;
    background: #EFEFEF;
    text-align: center;
`;
const Logo=styled.div`
    position: absolute;
    width: 105px;
    height: 37px;
    left: 704px;
    top: 31px;
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
    left: 50px;
    top: 88px;
    border: 1px solid #FFFFFF;
`;
const BackCircle1=styled.div`
    position: absolute;
    height: 319px;
    width: 319px;
    left: 76px;
    top: 130px;
    background: #FF5E6C;
    border-radius: 50%;
`;
const BackCircle2=styled.div`
    position: absolute;
    width: 209px;
    height: 209px;
    left: 246px;
    top: 88px;
    background: #E5E5E5;
    border-radius: 50%;
    
`;
const BackCircle3=styled.div`
    position: absolute;
    width: 209px;
    height: 209px;
    left: 1006px;
    top: 372px;
    background: #E5E5E5;
    border-radius: 50%;
`;
const BackCircle4=styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    left: 1309px;
    top: 322px;
    background: #FFFFFF;
    border-radius: 50%;
`;
const BackCircle5=styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    left: 829px;
    top: 743px;
    background: #FFFFFF;
    border-radius: 50%;
`;
const WriteLogo=styled.div`
    position: absolute;
    width: 280px;
    height: 150px;
    left: 1050px;
    top: 400px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 100px;
    line-height: 150px;
    color: #FF5E6C;
`;
const ImageInput=styled.div`
    position: absolute;
    width: 545px;
    height: 545px;
    left: 182px;
    top: 218px;
    background: #FFFFFF;
    border-radius: 20px;
`;
const TextInput=styled.div`
    position: absolute;
    width: 520px;
    height: 174px;
    left: 810px;
    top: 518px;
    background: #FFFFFF;
    border-radius: 10px;
`;

const Explanation=styled.div`
    position: absolute;
    width: 528px;
    height: 58px;
    left: 810px;
    top: 704px;
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
      left: '613px',
      top: '869px',
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
            <Logo>Drawa</Logo>
            <Line/>
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
            