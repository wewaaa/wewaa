import React from 'react';
import './MainPage.css';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Route,Routes,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

function MainPage () {

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const StyledButton = withStyles({
    root: {
      background: '#FF4D67',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      width: '286px',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      left: '77%',
      top: '20px',
      
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  return(
    <div className = "background">
      <head className = "logo"> Drawa </head>
      <div className = "ellipse3" />
      <div className = "ellipse2" />
      <div className = "ellipse1" />
      <div className = "mainHome">
        <div className = "mainTitle">
          <div className = "title">
            <h1 className = "titleDrawWrite"> DRAW </h1>
            <h3 className = "titlePicWhatYou"><span className="pictureBack">picture</span> what you</h3>
            <h1 className = "titleDrawWrite"><span className="color"> WRITE </span></h1>
            <p className = "explain">홈페이즈에 관련된 설명</p>
            <Link to="/UploadPage"><StyledButton>Go To Draw </StyledButton></Link>
          </div>
        </div>
        <div className = "mainImage" />

      </div>
      <div className = "howWorks">How deos it works</div>
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
  )
}

export default MainPage