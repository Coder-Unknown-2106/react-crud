import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import logPage from '../Images/5172658.jpg'

const Login = () => {
    const navigate = useNavigate()
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),
        password: Yup.string().required('Password is required').trim()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });
    function onSubmit(data) {
        const getVal = JSON.parse(localStorage.getItem('userAccount'))
        const currentLog = getVal.find((x) => (x.email === data.email) && (x.password === data.password))
        if (currentLog) {
            localStorage.setItem('logged', JSON.stringify(currentLog))
            navigate('/checkLogin')
        } else {
            alert('User Not Found')
        }

    }
    return (
        <div className='logPage'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ minHeight: '80vh' }} className=' container d-grid justify-content-center align-content-center  text-white' >
                    <div>
                        <h2 className=' text-center rounded my-5 bg-danger text-white p-2'>Login Form</h2>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-md-4 col-form-label fw-bold">Email</label>
                            <div className="col-md-8">
                                <input type="email" {...register('email')} className={`form-control ${errors?.email ? 'is-invalid' : ''}`} id="staticEmail" />
                            </div>
                        </div>
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                        <div className="row">
                            <label className="col-md-4 fw-bold " htmlFor=''>Password</label>
                            <div className='col-md-8'>
                                <input
                                    name="password"
                                    type="password"
                                    {...register('password')}
                                    className={`form-control  mb-3 ${errors?.password ? 'is-invalid' : ''
                                        }`}
                                />
                            </div>
                            <div className="invalid-feedback">{errors?.password?.message}</div>
                        </div>
                        <div className=' d-grid justify-content-center'>
                            <button type="submit" className=' btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login