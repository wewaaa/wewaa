import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ShareButton from '../components/ShareButton';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Modal from '../components/Modal';
import Header from '../components/Header';
import axios from "axios";

const Fix=styled.div`
    width: 1920px;
    height: 1080px;
    background: #373737;
    text-align: center;
`;

const WriteLogo=styled.div`
    position: absolute;
    width: 280px;
    height: 150px;
    left: 1043px;
    top: 413px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 100px;
    line-height: 150px;
    color: #FED41D;
`;
const ImageInput=styled.div`
    position: absolute;
    width: 541px;
    height: 541px;
    left: 215px;
    top: 221px;
    background: white;
    border-radius: 4px;
`;
const TextInput=styled.div`
    position: absolute;
    width: 488px;
    height: 205px;
    left: 838px;
    top: 523px;
    background: #FFFFFF;
    border-radius: 4px;
`;

const Explanation=styled.div`
    position: absolute;
    width: 470px;
    height: 27px;
    left: 838px;
    top: 735px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #FFFFFF;
    `;
const StyledButton = withStyles({
    root: {
      position: 'absolute',
      width: '286px',
      height: '58px',
      left: '1040px',
      top: '786px',
      background: '#FED41D',
      borderRadius:'10px',
      border: 0,
      color: 'black',
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
    const [loading,setLoading]=useState(false);
    const [sendText,setSendText]=useState('');
    const [imagesUrl,setImagesUrl]=useState([]);

 
    
    const onInputChange=async(e)=>{
        const text=e.target.value;
        setSendText(text);

    }
    const StartSwitch = ()=>{
            console.log(sendText)
    }
    const onSubmit =async(e)=>{
        e.preventDefault();
        const data ={
            text:sendText
        };
        setLoading(true)
        await axios.post(       
            'http://localhost/inference?prompt='+sendText,data
         ).then(response=>{
            console.log(response);
            setImagesUrl(response.data.images_url)
            setOpenModal(true);
        })
        .catch(error => {
            alert('false')
        })
        
        setLoading(false);
    };
    return (
        <Fix>
            <Header></Header>
            <ImageInput></ImageInput>
            <WriteLogo>Write</WriteLogo>
            <form onSubmit={onSubmit}>
                <TextInput>
                    <input className='TextInput' onChange={onInputChange}></input>
                </TextInput>
                <StyledButton variant="contained" onClick={StartSwitch} type='submit'>
                    Done
                </StyledButton>
            </form>
            <Explanation>
                <span>원하는 배경을 글로 써주세요. ex) 왼쪽 위에 해가있습니다.</span>
            </Explanation>
            {loading ? <StyledLinearProgress/>:<></>}
            {openModal ? <Modal closeModal={setOpenModal} imagesUrl={imagesUrl}/>:<></>}
        </Fix>
    )
}

export default UploadPage
            