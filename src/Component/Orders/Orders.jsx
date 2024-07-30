import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Orders() {




    let phoneRegex = /^01[0125][0-9]{8}$/;


    const schema = Yup.object({
        phone: Yup.string().matches(phoneRegex, 'Invalid Number,Only Egyptian Numbers').required('Phone Number is Required'),
        details: Yup.string().required('Details is Required'),
        city: Yup.string().required('City Is Required')

    })




    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        }
        , validationSchema: schema
        ,
        onSubmit: submitForm
    },

    )

    const navigate = useNavigate();

    function submitForm(values) {

        toast.success('Order Submitted Successfully');
       
        formik.resetForm();
        navigate('/');
    }



    return <>
        <Helmet>
            <title>Orders Page</title>
            <meta name="description" content="E-Commerce APP" />
        </Helmet>

        <div className="container  mt-5 ">


            <h3 className='text-main '>Shipping Address</h3>
            <form onSubmit={formik.handleSubmit} className="form mt-5 ">

                <div className="mb-4">
                    <label className='lead' htmlFor="">Details</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='details' value={formik.values.details} className='form-control' type="text" />
                    {(formik.errors.details && formik.touched.details ? <div className="alert alert-danger p-2">
                        {formik.errors.details}
                    </div> : '')}

                </div>


                <div className="mb-4">
                    <label className='lead' htmlFor="phone">Phone</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' id='phone' className='form-control' type="tel" />
                    {(formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2">
                        {formik.errors.phone}
                    </div> : '')}


                </div>


                <div className="mb-4">
                    <label className='lead' htmlFor="city">City</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='city' className='form-control' type="text" />
                    {(formik.errors.city && formik.touched.city ? <div className="alert alert-danger p-2">
                        {formik.errors.city}
                    </div> : '')}

                </div>

                <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-white p-2'>Order Now</button>




            </form>


        </div>

    </>
}
