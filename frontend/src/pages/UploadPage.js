import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Header from '../components/Header';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { exportComponentAsJPEG } from 'react-component-export-image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './Simson.css'

import default_Img from "./background.png";


const Fix=styled.div`
    width: 100%;
    height: 1115px;
    background-color: #373737;
`;

const UploadMargin=styled.div`
    width: 82rem;
    margin: 0 auto;
`;

const RightCol=styled.div`
    float: right;
`;
const WriteLogo=styled.div`
    width: 17.5rem;
    height: 6.8rem;
    font-family: Poppins;
    font-weight: bold;
    font-size: 6.25rem;
    color: #fed41d;
    margin-top: 22.5rem;
    text-aline: right;
`;

const ImageInput=styled.div`
    width: 43.813rem;
    height: 33.813rem;  
    margin-top: 8rem;
    background: #ffffff;
    border-radius: 1rem;
    float: left;
`;

const TextInput=styled.div`
    width: 30.5rem;
    height: 12.813rem;
    border-radius: 1rem;
    float: right;
    background-color: #fff;
    z-index: 1;
    margin-bottom: 2rem;

`;

const Explanation=styled.div`
    width: 30.5rem;
    margin-top: 0rem;
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 600;
    text-aline: left;
    color: #ffffff;
`;
const ButtonLoc=styled.div`
    width: 50rem;
    margin-left: 41rem;
`;

const test=styled.div`
    width: 300px;
    height: 350px;
`;

const StyledButton = withStyles({
    root: {
        background: ' #fed41d',
        borderRadius: 3,
        color: 'Black',
        boxShadow: ' box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: '0.7rem',
        justifyContent: 'center',
        width: '17.875rem',
        height: '3rem',
        marginTop: '6rem',
        marginLeft: '5rem',
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
    const [loading,setLoading]=useState(false);
    const [sendText,setSendText]=useState('');
    const [imagesUrl,setImagesUrl]=useState('');

    // 심슨 이미지 저장 State
    const [simsonImage,SetSimsonImage]=useState('')

    const checkImage=(e)=>{
        SetSimsonImage(e.target.value)
      }

    //URL이미지가 없을때 기본 배경이미지 설정 
    
    const onErrorImg = (e) => {
        e.target.src = default_Img;
    }



    //저장 src={`${image}?w=16&h=16&fit=crop&auto=format`}
    const componentRef = useRef();

    const ComponentToPrint = React.forwardRef((props, ref) => (
        <div ref={ref} style={{position:'relative'}}>
            <img alt='이미지' src={imagesUrl} width={'100%'} onError={onErrorImg}/>
            <div className='SimsonBox'>
                <img className='Simson'alt='' src={simsonImage}></img>
            </div>
        </div>
    ));

    
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
            setImagesUrl(response.data.images_url);
        })
        .catch(error => {
            alert('false')
        })
        
        setLoading(false);
    };
    return (
        <Fix>
            <UploadMargin>
                <Header/>
                <ImageInput>
                    <ComponentToPrint ref={componentRef} />
                </ImageInput>
                <form onSubmit={onSubmit}>
                    <RightCol>
                        <WriteLogo>Write</WriteLogo>
                        <TextInput>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                placeholder='Text'
                                style={{'width': "30.5rem" , 'height':"23px"}}
                                onChange={onInputChange}
                                />
                            </TextInput>
                        <Explanation>
                                원하는 배경을 글로 써주세요.  ex) 왼쪽 위에 해가있습니다.
                        </Explanation>
                    </RightCol>
                    <ButtonLoc>
                        <StyledButton variant="contained" onClick={StartSwitch} type='submit'>
                            Apply
                        </StyledButton>
                        <StyledButton variant="contained" onClick={() => exportComponentAsJPEG(componentRef)}>
                            Save As JPG
                        </StyledButton>
                    </ButtonLoc>
                </form>
                <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Select Simson</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="img/Bart2.png" control={<Radio />} onClick={checkImage} label="Bart" />
          <FormControlLabel value="img/Homer5.png" control={<Radio />} onClick={checkImage} label="Homer" />
          <FormControlLabel value="img/Lisa.png" control={<Radio />} onClick={checkImage}  label="Lisa" />
        </RadioGroup>
      </FormControl>
            </UploadMargin>
            {loading ? <StyledLinearProgress/>:<></>}
        </Fix>
    )
}

export default UploadPage
            