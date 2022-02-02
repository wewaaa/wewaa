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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { TableContainer } from '@material-ui/core';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


const Fix=styled.div`
    width: 100%;
    height: 1355px;
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
    margin-left: 65rem;
`;


const TC=styled.div`
    overflow:scroll;
    height:256px;
    width:500px
    border:1px solid black;

`;

//이미지 테이블 위치 
const ImageResultList=styled.div`
    margin-bottom:200px;
    botoom:2000px    
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
    const [openImageList,setOpenImageList]=useState(false);
    const [loading,setLoading]=useState(false);
    const [sendText,setSendText]=useState('');
    const [imagesUrlList,setImagesUrlList]=useState([]);
    const [imagesUrl,setImagesUrl]=useState('img/background.png');
    var params = {
        html2CanvasOptions: {
            scrollX: -window.scrollX,
            windowWidth: document.documentElement.offsetWidth,
        }
    };
    // 이미지 저장함수
    const cardRef = useRef();
    const onDownloadBtn = () => {
    const card = cardRef.current;
    const filter = (card) => {
      return card.tagName !== 'BUTTON';
    };
    domtoimage
      .toBlob(card, { filter: filter })
      .then((blob) => {
        saveAs(blob, 'card.png');
      });
  };
    
    //리스트에서 이미지 선택
    const changeImagesUrl=(e)=>{
        setImagesUrl(e.target.src)
    }

    //이미지 리스트 on/off
    const checkList=()=>{
        if(openImageList===false){
            setOpenImageList(true);
        }
        else
            setOpenImageList(false);
        console.log({openImageList})
    }


    // 완성한 이미지 저장 State
    const [simsonImage,setSimsonImage]=useState('img/Questions.png')

    const checkImage=(e)=>{
        setSimsonImage(e.target.value)
      }


    //URL이미지(배경이미지)가 없을때 기본 배경이미지 설정 
    //  const onErrorImg = (e) => {
    //      e.target.src = 'img/background.png';
    //  }
    // 활용 =>  <img alt='이미지' src={imagesUrl} width={'100%'} onError={onErrorImg}/>



    //저장기능함수  ex)src={`${image}?w=16&h=16&fit=crop&auto=format`}
    //const componentRef = useRef();

    //const ComponentToPrint = React.forwardRef((props, ref) => (
        //<div ref={ref} style={{position:'relative'}}>
           // <img alt='이미지' src={imagesUrl} width={'100%'}/>
           // <div className='SimsonBox'>
               // <img className='Simson'alt='' src={simsonImage}></img>
           // </div>
       // </div>
    //));

    //텍스트 입력값을저장
    const onInputChange=async(e)=>{
        const text=e.target.value;
        setSendText(text);

    }
    const StartSwitch = ()=>{
            console.log(sendText)
    }
    
    // API 실행
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
            setImagesUrlList(response.data.images_url);
        })
        .catch(error => {
            alert('false')
        })
        
        setLoading(false);
        alert('이미지로딩 완료')
    };
    return (
        <Fix>
            <UploadMargin>
                <Header/>
                <ImageInput>
                <div ref={cardRef}className='card' style={{position:'relative','bottom':'3rem'}}>
                    <img alt='이미지' src={imagesUrl} width={'100%'}/>
                    <div className='SimsonBox'>
                        <img className='Simson'alt='' src={simsonImage}></img>
                    </div>
                    <StyledButton className='downBtn' variant="contained" onClick={onDownloadBtn} style={{'marginLeft':'47rem','bottom':'3.39rem'}}>Save as .jpg</StyledButton>
                </div>
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
                                원하는 배경을 글로 써주세요.  ex)milky way,
                        </Explanation>
                    </RightCol>
                    <ButtonLoc>
                        <StyledButton variant="contained" onClick={StartSwitch} type='submit'>
                            Text Apply
                        </StyledButton>
                    </ButtonLoc>
                </form>
                <FormControl style={{'bottom':'5.5rem'}}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Select Simson</FormLabel>
                    <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    >
                    <FormControlLabel value="img/Bart2.png" control={<Radio />} onClick={checkImage} label="Bart"   />
                    <FormControlLabel value="img/Homer5.png" control={<Radio />} onClick={checkImage} label="Homer" />
                    <FormControlLabel value="img/Lisa.png" control={<Radio />} onClick={checkImage}  label="Lisa" />
                    </RadioGroup>
                </FormControl>
                <ImageResultList>
                    <IconButton color="primary" onClick={checkList} component="span"><PhotoCamera />Open List</IconButton>
                        {openImageList ?
                            <TC>
                                <ImageList sx={{ width: 1850, height: 216 }} cols={9} rowHeight={164}>
                                {imagesUrlList.map((image) => (
                                    <ImageListItem key={image}>
                                    <img
                                        src={`${image}?w=16&h=16&fit=crop&auto=format`}
                                        srcSet={`${image}?w=16&h=16&fit=crop&auto=format&dpr=2 2x`}
                                        alt="profile"
                                        onClick={changeImagesUrl}
                                    />
                                    </ImageListItem>
                                ))}
                                </ImageList>
                            </TC>
                        :<></>}
                    
                </ImageResultList>   
            </UploadMargin>
            {loading ? <StyledLinearProgress/>:<></>}
        </Fix>
    )
}

export default UploadPage
            