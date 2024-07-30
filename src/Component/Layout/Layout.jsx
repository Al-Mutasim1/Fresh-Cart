import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { userToken } from '../../Context/UserTokenContext'
import { Offline, Online } from "react-detect-offline";


export default function Layout() {


  let { setToken } = useContext(userToken);

  useEffect(() => {

    if (localStorage.getItem('userToken') !== null) {
      setToken(localStorage.getItem('userToken'))
    }


  }, []);

  return <>

    <Navbar />
    <Outlet></Outlet>
    <div>
      <Offline >
        <div className='offline m-5 fixed-top border-2 border-black p-3'>
          <i className="fa-solid fa-wifi "></i>You're Offline
        </div>

      </Offline>
    </div>
    <Footer />

  </>

}
