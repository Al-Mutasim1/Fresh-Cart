
import axios from 'axios';
import React, { createContext } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';



export const cartContext = createContext();

export default function CartContextProvider({ children }) {


    const [removeItem, setRemoveItem] = useState(null);
    const [numOfCarts, setNumOfCartItem] = useState(null); 
    const [dataArr , setDataArr] = useState([]); 
    
    const [count, setCount] = useState(0);



    //Add Product To Cart
    async function addProductToCart(id) {

        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                "productId": id
            },
            {
                headers: { token: localStorage.getItem('userToken') }
            }
        )
        setNumOfCartItem(data.numOfCartItems);
        console.log(data);

        return data

    }



    //Get All Product to Cart
    async function getAllProductsInTheCart() {

        let response = await axios(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: { token: localStorage.getItem('userToken') }
            }).catch((err) => console.log(err));
            if(response?.data.data.products.length === 0)
            {
                setDataArr([])

            }

        return response;

    }


    //Remove Item From Cart
    async function removeItemFromCart(id) {

        const { data: removedData } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token: localStorage.getItem('userToken') } })

        setRemoveItem(removedData);

        setNumOfCartItem(removedData.numOfCartItems)

        return removedData;

    }






    //Update Product Cart 

    async function updateProductCard(id , counter) {

        let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
               count : counter
            },
            {
              headers:{token:localStorage.getItem('userToken')}
            }


        ); 

        setNumOfCartItem(response._id) ; 
        return response ; 
    }




    //Clear User Cart

    async function clearUserCart() { 

        let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers:{token:localStorage.getItem('userToken')} 
        }).catch((err) => console.log(err)) ;
        setNumOfCartItem(0)
        return response ; 
     }






    return <cartContext.Provider value={{ dataArr , clearUserCart ,updateProductCard , getAllProductsInTheCart, numOfCarts, addProductToCart, removeItemFromCart, removeItem, setNumOfCartItem , setCount ,count }}>
        {children}
    </cartContext.Provider>

}
