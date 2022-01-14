import React from 'react';
import './MainPage.css';
import { useMediaQuery } from 'react-responsive';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Route,Routes,Link} from 'react-router-dom';

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
            <h1 class="DRAW">DRAW</h1>
            <h3 class="PictureWhatYou">picture what you</h3>
            <h1 class="WRITE">WRITE</h1>
            <h4 class="Explain">Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry.  Lorem Ipsum has been the industry</h4>
            <Link to="/UploadPage"><button class="ButtonDraw"> go to Draw </button>Create account</Link>
            <img className="HomeImage" alt="homeImage" src="/img/a.png" />
            
            </div>
            <div>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={6000}
            >
                <div data-src="/img/Slide1.png" />
                <div data-src="/img/Slide2.png" />
                <div data-src="/img/Slide3.png" />
            </AutoplaySlider>
            </div>
        </>
    )
}

const AutoplaySlider = withAutoplay(AwesomeSlider);

const slider = (
  <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
  >
    <div data-src="/img/Slide1.png" />
    <div data-src="/img/Slide2.png" />
    <div data-src="/img/Slide3.png" />
  </AutoplaySlider>
);


export default MainPage