import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet';

export default function CategorySliders() {

   function getCategorySliders()
   {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }

   let {data , isLoading } = useQuery('categorySliderQueryKey' , getCategorySliders ,{
    refetchOnMount : false 
   })

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2 ,
        autoplay : true,
        arrows : false,
        autoplaySpeed: 2500 ,
        speed :500 ,
      };

      


  return <>
 
   <div className='my-5 w-75 mx-auto '>
      <Slider {...settings}>
       
       {data?.data.data.map((category , key) =>  
       <div key={key}>
          <img style={{width:'100%', height:'300px' }} src={ category.image } alt="Slider" />
          <h4 className='mt-2 text-center'>{category.name}</h4>
        </div> )}
     
      </Slider>
    </div>
  
  
  </>
}
