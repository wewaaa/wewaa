import React from 'react';
import './MainPage.css';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
<<<<<<< HEAD
=======
import { Route,Routes,Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
>>>>>>> ea9c18d8b7408bf8a27564820c35078f50aa386c



<<<<<<< HEAD
function MainPage () {
  return(
    <div className = "background">
      <head className = "logo"> Drawa </head>
      
      <div className = "mainHome">
        <div className = "mainTitle">
          <div className = "title">
            <h1 className = "titleDrawWrite"> DRAW </h1>
            <div className = "Ellipse"></div>
            <h3 className = "titlePicWhatYou"><span className="pictureBack">picture</span> what you</h3>
            <h1 className = "titleDrawWrite"><span className="color"> WRITE </span></h1>
          </div>
        </div>
        <div className = "mainImage" />
      </div>
      <div className = "howWorks">How deos it works</div>
=======
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
>>>>>>> ea9c18d8b7408bf8a27564820c35078f50aa386c


    </div>
    
  )
}

export default MainPage