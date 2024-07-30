import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet';

export default function Category() {


  function getAllCategory()
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  const {data , isLoading} = useQuery('getAllCategoryUniqueKey' , getAllCategory , { 
    refetchOnMount:false ,
  }) ; 


 console.log(data?.data.data);

  return <>
     <Helmet>
        <title>Category</title>
        <meta name="description" content="E-Commerce APP" />
    </Helmet>
  <div className="container py-5 my-5">
    <div className="row justify-content-center align-items-center gy-4">
     {data?.data.data.map((category , key) =>  <div key={key} className="col-md-3 text-center ps-5">
        <div className="crd">
          <img width={'100%'} height={'100%'} src={category.image} alt="Category-Image" />
          <h2>{category.name}</h2>
        </div>
      </div>)}
    </div>
  </div>
  
  
  
  
  
  
  </>
}
