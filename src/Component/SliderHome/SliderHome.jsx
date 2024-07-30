import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function SliderHome() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    autoplay : true,
    arrows : false,
  };


  return <>


    <div className='my-5 w-75 mx-auto  pb-2 '>
      <Slider {...settings}>
        <div>
          <img style={{width:'100%', height:'800px' }} src={ require("../../../src/Assets/Images/Slider3.jpg") } alt="Slider" />
        </div>


        <div>
        <img style={{width:'100%', height:'800px' }} src={ require("../../../src/Assets/Images/Slider2.jpg") } alt="Slider" />

        </div>

        <div>
        <img style={{width:'100%', height:'800px' }} src={ require("../../../src/Assets/Images/Slider4.jpg") } alt="Slider" />

        </div>
     
      </Slider>
    </div>
  </>
}
