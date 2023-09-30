import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
    const schema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
        productPrice: Yup.string().required('Product Priceis required').trim(),
        productQuanity: Yup.string().required('Product Priceis required').trim(),

    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });

    const navigate = useNavigate()


    const loggedUser = JSON.parse(localStorage.getItem('logged'))


    function addProduct(data) {
        const getVal = JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]')
        const id = getVal.length ? getVal[getVal.length - 1].id + 1 : 1
        // const val = getVal.find((user) => user.email === data.email)
        // if (val) {
        //     alert('userAlready')
        //     reset()
        //     return
        // }
        localStorage.setItem(`${loggedUser.userName} products`, JSON.stringify([...JSON.parse(localStorage.getItem(`${loggedUser.userName} products`)) || [],
        {
            id,
            productName: data.productName,
            productPrice: data.productPrice,
            productQuanity: data.productQuanity,
        }
        ]))
        reset()
        navigate('/listProduct')

    }
    return (
        <div>
            <form onSubmit={handleSubmit(addProduct)}>
                <div className=" d-grid justify-content-center my-5">
                    <h1 className=" text-center py-2">Product Add</h1>
                    <div>
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="ProductName"
                            {...register('productName')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productName?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="form-label">Product Quantity</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="quantity"
                            {...register('productPrice')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productQuanity ? 'is-invalid' : ''
                            }`} name="" id="price"
                            {...register('productQuanity')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productQuanity?.message}
                        </div>
                    </div>
                    <button className="btn btn-dark my-3">ADD PRODUCT</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct