import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';


export default function Cart() {


  const { dataArr , clearUserCart ,  updateProductCard, getAllProductsInTheCart, numOfCarts, setNumOfCartItem, removeItemFromCart, removedData, setCount, count } = useContext(cartContext)


  const [Loading, setLoading ] = useState(false) ; 

  
  const [Load, setLoad ] = useState(false)




  // Using useQuery 
  const {  data, isLoading, isFetched, isError, refetch } = useQuery('productCartUniqueKey', callGetProduct, {

    refetchInterval: 1000,
  });

  console.log(data?.data.data._id);


  //Call CartContext to Get ALL Product
  async function callGetProduct() {

    return await getAllProductsInTheCart()
  }





  //Remove Function
  async function getRemovedFunc(id) {
    setLoading(true);
    let response = await removeItemFromCart(id);
    if (response.status === 'success') {
      setLoading(false)


      toast.success('Removed Successfully');
      await callGetProduct();

    }

  };




  async function increasingProductCart(id, counter) {

   return await updateProductCard(id, counter).catch((err) => toast.error(err)).then(() => {
      callGetProduct();
      toast.success('Added');
    })


  }




  async function decreasingProductCart(id, counter) {
    if (counter == 0) {
      getRemovedFunc(id)
      return;
    }

    return await updateProductCard(id, counter).catch((err) => toast.error(err)).then(() =>  {
      toast.success('Decreased')
      callGetProduct()
     
    })



  }



 async function callclearUserCartFunc()
  {


    return await clearUserCart().then( () => toast.success('Cleared'))



  }






  return <>
     <Helmet>
        <title>Cart</title>
        <meta name="description" content="E-Commerce APP" />
    </Helmet>

    {(isLoading && dataArr === null) ? <div className="d-flex justify-content-center vh-100 align-items-center ">
      <Bars
        height="80"
        width="80"
        color={"#0aad0a"}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> : <div className=" card container pt-5 mt-5 min-vh-100">
      <div className="">
        <h3 className='text-main pb-3'>Shop Cart</h3>
        <h5 className=''>Total Cart Price: <span className='text-main'>{data?.data.data.totalCartPrice} EGP </span> </h5>
       <div className="d-flex justify-content-between">
       <Link to={`/orders`} className=' btn btn-primary p-2 mt-2'>Submit Order</Link>
       <button onClick={() => callclearUserCartFunc()} className=' btn btn-danger p-2 mt-2'>Clear All Cart</button>
        
       </div>

        <div className="row mb-5 pb-5 ">

          {(data?.data?.data.products?.map((product, key) => <div key={key} className='d-flex justify-content-center  cardProduct align-items-center   border-bottom  '>


            {(Loading && dataArr === null) ? <div className="d-flex justify-content-center vh-100 align-items-center ">
              <Bars
                height="80"
                width="80"
                color={"#0aad0a"}
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div> : <>
              <div className='col-md-10 my-5 d-flex justify-content-start align-items-center '>
                <img className='w-25  ' src={product.product.imageCover} alt="Product Cart height" />
                <div className='ps-4'>
                  <h4>{product.product.title}</h4>
                  <h5 className='text-main py-2 fw-bold'>Price: {product.price} EGP</h5>
                  <span className='m-auto '> <button onClick={() => getRemovedFunc(product.product._id)} className='btn btn-outline-danger'> <i className="far fa-trash-alt"></i></button> Remove </span>
                </div>
              </div>

              <div className="col-md-2 d-flex justify-content-end align-items-center ">
                <button onClick={() => increasingProductCart(product.product.id, product.count + 1)} className='btn btn-outline-info  '>+</button>
                <h6 className='mx-2 my-auto  card p-2'>{product.count}</h6>
                <button onClick={() => decreasingProductCart(product.product.id, product.count - 1)} className='btn btn-outline-warning '>-</button>

              </div> </> }




          </div>))}
        </div>






      </div>
    </div>}



  </>
}
