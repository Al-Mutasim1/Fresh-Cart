import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Bars } from 'react-loader-spinner';
import {Helmet} from "react-helmet";



export default function Brands() {



  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data, isLoading } = useQuery('allBrandsQueryKey', getAllBrands, {
    refetchOnMount: false,
  })

  return <>
   <Helmet>
        <title>Brands</title>
        <meta name="description" content="E-Commerce APP" />
    </Helmet>
  {isLoading?  <div className='vh-100 d-flex justify-content-center align-items-center'>
  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>:    <div className="container my-5 py-5">
      <div className="row">
        <h1 className='font-size  text-center pb-5 mb-5'>OUR BRANDS</h1>
        {data?.data.data.map((brand, key) =>
          <div key={key} className=" col-md-3">

            <div className="brand-image  ">
              <img src={brand.image} alt="" />

            </div>


          </div>
        )}
      </div>

    </div>}


  </>
}
