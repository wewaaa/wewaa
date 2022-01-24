import React from 'react';
import './MainPage.css';
import styled from 'styled-components';
import { ExternalLink } from 'react-external-link';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Route,Routes,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/Header';

function MainPage () {

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const StyledButton = withStyles({
    root: {
      background: ' #fed41d',
      borderRadius: 3,
      color: 'Black',
      boxShadow: ' box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '0.7rem',
      width: '17.875rem',
      height: '3rem',
    },

    label: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
  })(Button);




  return(
    <div>
      <div className = "background">
        <Header></Header>
        <div className = "mainHome">
          <div className = "mainImage" />
          <div className = "mainTitle">
            <div className = "title">
              <h1 className = "drawTitle">
                <span className = "drawColor">Draw <span className= "theTitle">the </span></span> BACKGROUND
                <h5 className = "writeTitle"> of what you write</h5>
              </h1>
              <div className = "mainCol">
                  <Link to="/UploadPage"><StyledButton>Go To Draw </StyledButton></Link>  
                </div>
            </div>
          </div>
        </div>
      </div>


      <div className = "second">
        <div calssName = "secondWrap">
          <div className = "aboutUs">ABOUT US</div>
          <div className = "explainUs">
            <p>영어로 설명</p>
            <p>저희 웹사이트는 그림의 배경을 만들어드리는 서비스 입니다. 직접 그림을 그리는것이 아니고 글을 쓰면 뒤에 배경이 자동으로 그려질수있습니다.
            직접 배경을 생성할수있기 때문에 캐릭터의 저작권문제로부터 자유로워 질수있는 장점을 가지고있습니다.</p>
          </div>
          <ExternalLink href="https://github.com/wewaaa/wewaa" target="_blank"><StyledButton className = "gitButton">About Us</StyledButton></ExternalLink>
          
          <div class = "made">
            <b><p>by 김기현/Backend</p>
            <p>나승미/Frontend</p>
            <p>유제빈/Frontend</p>
            <p>함우주/Ai,Backend</p></b>
          </div> 
        </div>
      </div>


      <div className = "third">
        <div className = "howWorks">HOW IT WORK</div>
          <div className='slide-resizer'>
          <AutoplaySlider 
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={2000}
          >
            <div data-src="/img/homeSlide1.png" />
            <div data-src="/img/homeSlide2.png" />
            <div data-src="/img/homeSlide3.png" />
          </AutoplaySlider>
          </div>
      </div>

    </div>
  )
}

export default MainPage