import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SummaProduct = () => {
    const { id } = useParams()
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]'))
    const navigate = useNavigate()

    const getSingleItem = productList.find((product) => product.id === Number(id))

    // const [productName, setProductName] = useState()
    // const [productPrice, setProductPrice] = useState()
    // const [productQuanity, setProductQuanity] = useState()

    const schema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
        productPrice: Yup.string().required('Product Priceis required').trim(),
        productQuanity: Yup.string().required('Product Priceis required').trim(),

    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });
    const updateItems = (newItems) => {
        setProductList(newItems)
        localStorage.setItem(`${loggedUser.userName} products`, JSON.stringify(newItems));
    }

    function addProduct(data) {
        console.log(data);
        // const getVal = JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]')
        // const id = getVal.length ? getVal[getVal.length - 1].id + 1 : 1
        // localStorage.setItem(`${loggedUser.userName} products`, JSON.stringify([...JSON.parse(localStorage.getItem(`${loggedUser.userName} products`)) || [],
        // {
        //     id,
        //     productName: data.productName,
        //     productPrice: data.productPrice,
        //     productQuanity: data.productQuanity,
        // }
        // ]))
        const editProduct = productList.map((product) => product.id === Number(id) ? { ...product, productName: data.productName, productPrice: data.productPrice, productQuanity: data.productQuanity } : product)
        updateItems(editProduct)


        // reset()
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
                            defaultValue={getSingleItem.productName}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productName?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="form-label">Product Quantity</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="quantity"
                            {...register('productQuanity')}
                            defaultValue={getSingleItem.productQuanity}

                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productQuanity ? 'is-invalid' : ''
                            }`} name="" id="price"
                            {...register('productPrice')}
                            defaultValue={getSingleItem.productPrice}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <button className="btn btn-dark my-3">UPDATE PRODUCT</button>
                </div>
            </form>
        </div>
    )
}

export default SummaProduct