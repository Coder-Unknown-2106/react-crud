import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const navigate = useNavigate()
  // form validation rules
  const schema = Yup.object().shape({
    userName: Yup.string().required('user Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
    firstName: Yup.string().required('First Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    email: Yup.string().required('Email is required').email('Email is invalid').trim(),
    password: Yup.string().required('Password is required').trim().min(8, 'Password must be at least 8 characters')
    ,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required').trim(),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'

  });

  function onSubmit(data) {
    const getVal = JSON.parse(localStorage.getItem('userAccount') || '[]')
    const id = getVal.length ? getVal[getVal.length - 1].id + 1 : 1
    const val = getVal.find((user) => user.email === data.email)
    if (val) {
      alert('userAlready')
      reset()
      return
    }
    localStorage.setItem('userAccount', JSON.stringify([...JSON.parse(localStorage.getItem('userAccount')) || [],
    {
      id,

      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    ]))
    reset()
    navigate('/login')
  }

  return (
    <div className=' container d-grid justify-content-around'>
      <div className="card m-3">
        <h5 className="card-header">
          React - Form Validation Example with React Hook Form
        </h5>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div >
              <div >
                <label htmlFor='' className='form-label'>User Name</label>
                <input
                  name="userName"
                  type="text"
                  {...register('userName')}
                  className={`form-control mb-3 ${errors?.userName ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">
                  {errors?.userName?.message}
                </div>
              </div>
              <div >
                <label htmlFor='' className='form-label'>First Name</label>
                <input
                  name="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`form-control mb-3 ${errors?.firstName ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">
                  {errors?.firstName?.message}
                </div>
              </div>
              <div >
                <label className='form-label' htmlFor=''>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`form-control mb-3 ${errors?.lastName ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">{errors?.lastName?.message}</div>
              </div>
            </div>
            <div className="">
              <label className='form-label' htmlFor=''>Email</label>
              <input
                name="email"
                type="email"
                {...register('email')}
                className={`form-control mb-3 ${errors?.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors?.email?.message}</div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className='form-label' htmlFor=''>Password</label>
                <input
                  name="password"
                  type="password"
                  {...register('password')}
                  className={`form-control mb-3 ${errors?.password ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">{errors?.password?.message}</div>
              </div>
              <div className="form-group col">
                <label className='form-label' htmlFor=''>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className={`form-control mb-3 ${errors?.confirmPassword ? 'is-invalid' : ''
                    }`}
                />
                <div className="invalid-feedback">
                  {errors?.confirmPassword?.message}
                </div>
              </div>
            </div>
            <div className="form-group form-check">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register('acceptTerms')}
                id="acceptTerms"
                className={`form-check-input mb-3 ${errors?.acceptTerms ? 'is-invalid' : ''
                  }`}
              />
              <label htmlFor="acceptTerms" className="form-check-label mb-3">
                Accept Terms & Conditions
              </label>
              <div className="invalid-feedback">
                {errors?.acceptTerms?.message}
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary me-1">
                Register
              </button>
              <button className="btn btn-secondary" onClick={() => reset()} type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormRegister
