import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/Images/freshcart-logo.svg'
import { userToken } from './../../Context/UserTokenContext';
import { cartContext } from '../../Context/CartContext';



export default function Navbar() {


  const { token, setToken } = useContext(userToken);

  const { numOfCarts } = useContext(cartContext);
  

  const navigate = useNavigate();




  function logOut() {

    localStorage.removeItem('userToken');
    setToken(null)
    navigate('/login');

  }



  return <>
    <nav className="navbar navbar-expand-lg  bg-body-tertiary">
      <div className="container">
        <Link className="fs-2 fw-bold main-color" to="/">
          <img src={logo} alt="" />
        </Link>

        <div className=" navbar-brand   " id="">
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
         </button>
         <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
            {(token !== null) ?
              <> <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="">Home</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link "  to="brands">Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link "  to="cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link "  to="category#">Category</Link>
                </li>  
                <li className="nav-item me-5">
                  <Link className="nav-link "  to="wishlists">Wishlist <i className="fa-solid  text-danger fa-heart"></i>  </Link>
                </li>
             
           

                <li className="nav-item ">
                  <Link className="nav-link  "  to="cart">
                    <button type="button" className="btn btn-primary position-relative ">
                      <i className="fas fa-shopping-cart "></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                      {numOfCarts}
                      </span>
                    </button>
                  </Link>
                </li>

              






                <li className="nav-item ms-lg-5">
                  <span className="nav-link " >
                    <button className='btn btn-outline-info  '><Link className='text-dark' to={'/profile'}>Profile</Link></button>
                  </span>
                </li>


                <li className="nav-item">
                  <span className="nav-link " >
                    <button onClick={() => logOut()} className='btn btn-outline-danger '>Logout</button>
                  </span>
                </li>


              </> : " "}


            {(token === null) ?

              <><li className="nav-item">
                <Link className="nav-link " aria-current="page" to="login">Login</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="register">Register</Link>
                </li> </> : ''
            }

          </ul>
          </div>
        </div>
      </div>
    </nav>

  </>







}
