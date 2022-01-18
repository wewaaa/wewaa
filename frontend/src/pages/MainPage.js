import React from 'react';
import './MainPage.css';
import { useMediaQuery } from 'react-responsive';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Route,Routes,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const MainPage = () => {
    const isDesktopOrLaptop = useMediaQuery({minDeviceWidth: 1224})
    const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 })

    return (
        <>
            <div class="Background">
            <div class="Drawa">Drawa</div>
            <div class="NavLine"></div>
            <div class="Ellipse"></div>
            <div class="Ellipse1"></div>
            <div class="Ellipse2"></div>
            <div calss="PictureBack"></div>
            <h1 class="DRAW">DRAW</h1>
            <h3 class="PictureWhatYou"> picture what you</h3>
            <h1 class="WRITE">WRITE</h1>
            <h4 class="Explain">Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry.  Lorem Ipsum has been the industry</h4>
            <Link to="/SignPage"><StyledButton variant="contained">go to Draw </StyledButton></Link>
            <img className="HomeImage" alt="homeImage" src="/img/a.png" />
            
            </div>
            <div>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={6000}
            >
                <div data-src="/img/homeSlide1.png" />
                <div data-src="/img/homeSlide2.png" />
                <div data-src="/img/homeSlide3.png" />
            </AutoplaySlider>
            </div>
        </>
    )
}

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
      left: '182px',
      top: '530px',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

export default MainPage