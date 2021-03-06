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
              <p>????????? ???????????? ????????? ???????????? ??? ????????? ???????????? ???????????? ???????????????. ????????? ????????? ?????? ???????????? ?????? ??? ?????? ????????? ???????????? ?????? ?????? ????????? ?????? ??? ?????? ????????? ????????? ????????????.</p>
            </div>          
          </div>
          <ExternalLink href="https://github.com/wewaaa/wewaa" target="_blank"><StyledButton className = "gitButton">About Us</StyledButton></ExternalLink>
          
          <div class = "made">
            <p>?????????(GiHyun Kim) - AI,Backend,DevOps</p>
            <p>?????????(Seungmi Na) - Frontend,UI/UX Design </p>
            <p>?????????(Jaebin Yu) - Frontend</p>
            <p>?????????(Woojoo Hahm) - AI,Backend</p>
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