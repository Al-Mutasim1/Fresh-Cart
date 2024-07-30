import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { userToken } from '../../Context/UserTokenContext';
import { Helmet } from 'react-helmet';


export default function Login() {

  const { setToken, token } = useContext(userToken);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  async function loginForm(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
      setError(err.response.data.message)
      setisLoading(false)
    })


    if (data.message === "success") {
      localStorage.setItem('userToken', data.token);
      setToken(data.token);
     
      setisLoading(false);
      navigate('/')

    }

  }

  let formik = useFormik({
    initialValues:
    {
      email: '',
      password: ''
    }, onSubmit: loginForm
  })


  return <>
   <Helmet>
        <title>Login Page</title>
        <meta name="description" content="E-Commerce APP" />
    </Helmet>

    <form className="container" onSubmit={formik.handleSubmit}>
      <h2 className='m-5 text-center text-main'>Login Form</h2>
      <div className="mt-4">
        <label className='mb-2 mx-auto' htmlFor="email">Email :</label>
        <input onChange={formik.handleChange} name='email' value={formik.values.email} className='form-control  mx-auto' type="email" />
      </div>


      <div className="my-4">
        <label className='mb-2 text-center    mx-auto' htmlFor="passord">Password :</label>
        <input onChange={formik.handleChange} name='password' value={formik.values.password} className='form-control  mx-auto' type="password" />
      </div>

      {error !== null ? <div className='alert alert-danger p-2'>{error}</div> : ''}

      {isLoading ? <button type='button' className='btn bg-main text-white mt-4 px-4 '>
        <Audio
          height="20"
          width="45"
          radius="9"
          color="white"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />

      </button> : <button type='submit' className='btn bg-main text-white mt-4 px-4 '>Login</button>}
    </form>


  </>
}