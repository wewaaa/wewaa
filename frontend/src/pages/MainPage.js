import React from 'react';
import './MainPage.css';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';



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


    </div>
    
  )
}

export default MainPage