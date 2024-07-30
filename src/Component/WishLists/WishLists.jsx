import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Bars } from 'react-loader-spinner';

export default function WishLists() {



    async function getAllWishList() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: { token: localStorage.getItem('userToken') } })
    }
    const [loading, setLoading] = useState(false)


    async function removeFromWishList(productId) {

        setLoading(true);

        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: { token: localStorage.getItem('userToken') } }).catch((err) => console.log(err))
        getAllWishList();
        setLoading(false);




    }



    const { data, isLoading } = useQuery('wishListUniqueKey', getAllWishList, {

        refetchInterval: 3000

    });


    return <>

        {isLoading || loading ? <div className="d-flex justify-content-center align-items-center vh-100">
            <Bars
                height="80"
                width="80"
                color={"#0aad0a"}
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div> : <div className="container my-5 py-5">
            <div className="row g-5">
                {data?.data?.data.map((product, key) =>
                    <div key={key} className="col-md-4 ">
                        <div className="images card p-3 d-flex justify-content-center align-items-center">
                            <img className='w-50 h-25' src={product.imageCover} alt="" />
                            <h3 className='mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                            <button onClick={() => removeFromWishList(product.id)} className=' p-2 btn btn-outline-danger'>Remove from wishlist</button>
                        </div>
                    </div>
                )}

            </div>
        </div>}



    </>
}
