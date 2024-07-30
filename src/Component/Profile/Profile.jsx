import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';





export default function Profile() {
    

    const [profileData, setProfileData] = useState(null);



    useEffect(() =>  {
     const {name} =  jwtDecode(localStorage.getItem('userToken')) ; 
    setProfileData(name)
       
    } , [])




  return <>
  
  <Helmet>
    <title>Profile Page</title>
    <meta name="description" content="E-Commerce APP" />
  </Helmet>
  
<div className="container mt-5 pt-5">
    <div className="profileData">
    <h2 className='text-center '>Hello <span className='text-uppercase text-primary' >{profileData}</span></h2>


    </div>
    </div>  
  
  
  
  
  </>
}
