import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Bars } from 'react-loader-spinner'
import SliderHome from './../SliderHome/SliderHome';
import CategorySliders from '../CategorySliders/CategorySliders';
import { Link } from 'react-router-dom';
import ProductDetails from './../ProductDetails/ProductDetails';
import { cartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function Home() {



  function getAllProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }


  const productQuery = useQuery('AllProductQueryKey', getAllProduct);

  let { data, isLoading } = productQuery;


  let [Loading, setLoading] = useState(false);

  let { addProductToCart } = useContext(cartContext);
  let [productId, setProductId] = useState(null);





  async function addProduct(id) {

    setLoading(true);

    let response = await addProductToCart(id);

    if (response.status === "success") {

      console.log(response);
      toast.success('Product Added Successfully');

    }
    else {
      toast.error(response.message)
    }
    setLoading(false);
    console.log(response);

  }



  const [wishList, setWishList] = useState([])

  async function addToWishList(productId) {
    let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { "productId": productId }, { headers: { token: localStorage.getItem('userToken') } })
    .catch((err) => console.log(err));

    toast.success('Added Successfully to Wishlist')


    setWishList(response.data.data);
    console.log(wishList);

  }






  return <>
    <Helmet>
      <title>Fresh Cart Home Page</title>
      <meta name="description" content="E-Commerce APP" />
    </Helmet>

    <div className="my-5 pb-5 min-vh-100">
      <SliderHome />
      <CategorySliders />
      <div className="container">


        {isLoading ? <div className="d-flex justify-content-center align-items-center ">
          <Bars
            height="80"
            width="80"
            color={"#0aad0a"}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
          : <>
            <div className="row g-4  ">

              {data?.data?.data.map((product, ids) => <div key={ids} className="col-md-3 product p-5 "> <Link to={`ProductDetails/${product.id}`} className="card border-0">
                <img className=' ' src={product.imageCover} alt="product" />
                <h4 className='lead text-center text-main'>{product.category.name}</h4>
                <h6 className=' text-center'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                <div className="price d-flex justify-content-around">
                  <p className='  ps-1 h-6'>{product.price} EGP</p>
                  <p className='rating-color  h-6'>{product.ratingsAverage} <i className="fa-solid fa-star"></i></p>

                </div>


              </Link>
                <div onClick={() => addToWishList(product.id)} className='text-center  mb-3 cursor-pointer fs-3'>

                  <i id={`heart`} className="fa-regular  fa-heart"></i>


                </div>



                <button onClick={() => addProduct(product.id)} className='btn bg-main w-100 text-white  '>
                  {Loading ? <span className='mx-auto text-center d-flex justify-content-center align-items-center'><Bars
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  /></span> : ' Add To Cart'}
                </button>


              </div>


              )}

            </div></>}

      </div>
    </div>



  </>


}
