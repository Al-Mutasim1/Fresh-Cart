import React, { useContext, useEffect } from 'react'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home';
import Brands from './Component/Brands/Brands';
import Cart from './Component/Cart/Cart';
import Category from './Component/Category/Category';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Products from './Component/Products/Products';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import NotFound from './Component/NotFound/NotFound';
import UserTokenProvider from './Context/UserTokenContext';
import ProtectRouter from './Component/ProtectRouter/ProtectRouter';
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './Component/Profile/Profile';
import Orders from './Component/Orders/Orders';
import WishLists from './Component/WishLists/WishLists';




const routers = createHashRouter([
  {
    path: '/', element: <Layout />, children:
      [
        { index: true, element: <ProtectRouter><Home /></ProtectRouter> },
        { path: 'brands', element: <ProtectRouter><Brands /></ProtectRouter> },
        { path: 'orders', element: <ProtectRouter><Orders /></ProtectRouter> },
        { path: 'orders/:orderId', element: <ProtectRouter><Orders /></ProtectRouter> },
        { path: 'profile', element: <ProtectRouter><Profile /></ProtectRouter> },
        { path: 'cart', element: <ProtectRouter><Cart /></ProtectRouter> },
        { path: 'wishlists', element: <ProtectRouter><WishLists/></ProtectRouter> },
        { path: 'cart/:id', element: <ProtectRouter><Cart /></ProtectRouter> },
        { path: 'category', element: <ProtectRouter><Category /></ProtectRouter> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'products', element: <ProtectRouter><Products /></ProtectRouter> },
        { path: 'productdetails/:id', element: <ProtectRouter><ProductDetails /></ProtectRouter> },
        { path: '*', element: <NotFound /> }

      ]
  }
])

export default function App() {

  const queryClient = new QueryClient();


  return <QueryClientProvider client={queryClient}>
    <CartContextProvider>

      <UserTokenProvider>
        <Toaster />
        <RouterProvider router={routers}></RouterProvider>

      </UserTokenProvider>
    </CartContextProvider>

  </QueryClientProvider>


}

