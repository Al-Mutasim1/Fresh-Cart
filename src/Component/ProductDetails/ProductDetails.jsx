import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

    let { id } = useParams();
    let { addProductToCart } = useContext(cartContext);


    const [Loading, setLoading] = useState(null)

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
        setLoading(false)


    }






    function getProductDetails(id) {
        return axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }


    let { data, isLoading } = useQuery('productDetailsUniqueKey', () => getProductDetails(id));


    return <>
        <Helmet>
            <title>Product Details</title>
            <meta name="description" content="E-Commerce APP" />
        </Helmet>

        {isLoading ? <><div className='vh-100 d-flex justify-content-center align-items-center'>
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div></> : <div className='mt-5 pt-5'>
            <div className="container">
                <div className="row  mx-auto justify-content-center align-items-center">
                    <div className="col-md-4">

                        <img className='w-100' src={data?.data.data.imageCover} alt="ProductDetails" />

                    </div>
                    <div className="col-md-7 offset-md-1">
                        <div className="description">
                            <h3 className='text-main  pb-2'>{data?.data.data.brand.name}</h3>
                            <h4>{data?.data.data.category.name}</h4>
                            <h5 className='lead pb-2'>{data?.data.data.title}</h5>
                            <span className='pb-2 text-secondary'>{data?.data.data.slug}</span>
                            <p className=' text-main pt-4'>{data?.data.data.price} EGP</p>

                            <button onClick={() => addProduct(id)} className='btn bg-main w-100 text-white  '>
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

                    </div>
                </div>

            </div>
        </div>}







    </>


}
