import React from 'react';
import './MainPage.css';
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
      zIndex: '3',
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
                <h5 className = "writeTitle"> of what you write
                </h5>
              </h1>
              <div className = "mainCol">
                <div className = "drawBut">
                  <Link to="/UploadPage"><StyledButton>Go To Draw </StyledButton></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className = "second">
        <div calssName = "secondWrap">
          <div className = "aboutUs">ABOUT US</div>
          <div className = "explainUs">
            <p>This website is a service that draws pictures of what you write. 
            You can write whatever you want and it will be drawn in the background. You can create your own picture.</p>
            <div className = "korExplain">
              <p>저희는 사용자가 글자를 입력했을 때 배경을 그려주는 서비스를 제공합니다. 원하는 배경을 글로 작성하여 그릴 수 있기 때문에 자신만의 개성 있는 그림을 만들 수 있는 장점을 가지고 있습니다.</p>
            </div>          
          </div>
          <ExternalLink href="https://github.com/wewaaa/wewaa" target="_blank"><StyledButton className = "gitButton">About Us</StyledButton></ExternalLink>
          
          <div class = "made">
            <p>김기현(GiHyun Kim) - AI,Backend,DevOps</p>
            <p>나승미(Seungmi Na) - Frontend,UI/UX Design </p>
            <p>유제빈(Jaebin Yu) - Frontend</p>
            <p>함우주(Woojoo Hahm) - AI,Backend</p>
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
            <div data-src="/img/simpson_Slider1.png" />
            <div data-src="/img/simpson_Slider2.png" />
            <div data-src="/img/simpson_Slider3.png" />
          </AutoplaySlider>
          </div>
      </div>

      <div className = "fourth">
        <div className = "space"></div>
      </div>

    </div>
  )
}

export default MainPage