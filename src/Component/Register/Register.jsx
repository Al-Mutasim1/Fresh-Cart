import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';





export default function Register() {

  let phoneRegex = /^01[0125][0-9]{8}$/;
  

  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  let schema = Yup.object({
    name: Yup.string().min(3, 'Min Length 3').max(12, 'Max length 12').required('Name is Required'),
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    phone: Yup.string().matches(phoneRegex, 'Invalid Number,Only Egyptian Numbers').required('Phone Number is Required'),
    password: Yup.string().required('Password Required').min(6, "Password must be at least 6 chars"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], `Password and Repassword Don't Match`).required('Password Required')
  })


  async function registerForm(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => {
      setError(err.response.data.message);
      setisLoading(false)

    });




    if (data.message === "success") {
      navigate('/login');
      setisLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: schema,
    onSubmit: registerForm,

  })






  return <>

<Helmet>
    <title>Register Page</title>
    <meta name="description" content="E-Commerce APP" />
  </Helmet>
    <div className="container">
      <div className='m-5  '>
        <h2 className=' text-center text-main'>Register Form</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>

        <label className='mb-3' htmlFor="name">Name :</label>
        <input className='form-control mb-2' name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" />
        {(formik.errors.name && formik.touched.name) ?
          <div className="alert alert-danger p-2">{formik.errors.name}</div> : ''}


        <label className='mb-3' htmlFor="email">Email :</label>
        <input className='form-control mb-2' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' type="email" />
        {(formik.errors.email && formik.touched.email) ? <div className="alert  alert-danger p-2">
          {formik.errors.email}
        </div> : ''}


        <label className='mb-3' htmlFor="password">Password :</label>
        <input className='form-control mb-2' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' type="password" />
        {(formik.errors.password && formik.touched.password) ? <div className="alert alert-danger p-2">
          {formik.errors.password}
        </div> : ''}


        <label className='mb-3' htmlFor="rePassword">RePassword :</label>
        <input className='form-control mb-2' onChange={formik.handleChange} name='rePassword' onBlur={formik.handleBlur} value={formik.values.rePassword} id='rePassword' type="password" />
        {(formik.errors.rePassword && formik.touched.rePassword) ? <div className="alert alert-danger p-2">
          {formik.errors.rePassword}
        </div> : ''}


        <label className='mb-3' htmlFor="phone">Phone :</label>
        <input className='form-control mb-2' name='phone' id='phone' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="tel" />
        <p className=' h6'>Hint:/only Egyption Number : 01122334455</p>
        {(formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2">
          {formik.errors.phone}
        </div> : '')}

        {(error != null) ? <div className='alert alert-danger p-2'>{error}</div> : ''}

        {isLoading ? <button type='button' className='btn bg-main   mx-auto  mt-3 '>
          <Audio 
            height="20"
            width="90"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          /></button>
          : <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-white mx-auto  mt-3 '>Register Now</button>
        }



      </form>
    </div>

  </>

}
