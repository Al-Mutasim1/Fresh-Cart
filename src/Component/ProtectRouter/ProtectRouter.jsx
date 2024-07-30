import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { userToken } from '../../Context/UserTokenContext'
import Login from './../Login/Login';
export default function ProtectRouter({children}) {

    const { token } = useContext(userToken); 

    if(token === null && localStorage.getItem('userToken') === null)
    {
        return <Navigate to={'/login'}/>
    }
    else 
    {
        return children
    }

 
}
