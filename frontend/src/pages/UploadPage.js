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
    background-color: #373737;
`;

const UploadMargin=styled.div`
    width: 82rem;
    margin: 0 auto;
    position: flex;
    color: red;
`;

const WriteLogo=styled.div`
    position: absolute;
    width: 17.5rem;
    height: 9.375rem;
    margin: 14.125rem 0 10.75rem 14.813rem;
    left: 1413px;
    top: 393px;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 100px;
    line-height: 150px;
    color: #fed41d;
`;

const ImageInput=styled.div`
    position: absolute;
    width: 33.813rem;
    height: 33.813rem;  
    left: 271px;
    top: 260px;
    background: #000000;
    border-radius: 1rem;
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
        background: ' #fed41d',
        borderRadius: 3,
        color: 'Black',
        height: 48,
        boxShadow: ' box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: '0.7rem',
        justifyContent: 'center',
        width: '17.875rem',
        height: '3rem',
      },
      label: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
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
            <UploadMargin>
                <Header></Header>
                <ImageInput></ImageInput>
                <WriteLogo>Write</WriteLogo>
                    <TextInput>
                        <input className='TextInput' onChange={onInputChange}></input>
                    </TextInput>
                    <StyledButton variant="contained" onClick={StartSwitch} type='submit'>
                        Done
                    </StyledButton>
                    <StyledButton variant="contained" onClick={StartSwitch} type='submit'>
                        Done
                    </StyledButton>
                <Explanation>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's standard dummy
                </Explanation>
                {loading ? <StyledLinearProgress/>:<></>}
                {openModal ? <Modal closeModal={setOpenModal} imagesUrl={imagesUrl}/>:<></>}
            </UploadMargin>
        </Fix>
    )
}

export default UploadPage
            