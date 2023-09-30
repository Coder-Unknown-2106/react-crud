import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const CheckLogin = () => {
    const navigate = useNavigate()
    const schema = Yup.object().shape({
        otp: Yup.string().required('otp is required'),

    });
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });

    function onSubmit(data) {
        const otp = 1234
        if (Number(data.otp) === otp) {
            navigate('/dashBoard')
        } else {
            alert('otp Not Found')
        }

    }
    return (
        <div>
            <form className='d-grid justify-content-center my-5' onSubmit={handleSubmit(onSubmit)}>
                <div className=' ' >
                    <label htmlFor='' className='form-label text-center py-2'>Enter OTP</label>
                    <input
                        name="otp"
                        type="text"
                        {...register('otp')}
                        className={`form-control mb-3 ${errors?.otp ? 'is-invalid' : ''
                            }`}
                    />
                    <div className="invalid-feedback">
                        {errors?.otp?.message}
                    </div>
                </div>
                <button className=' btn btn-primary' >Submit</button>
            </form>
        </div>
    )
}

export default CheckLogin