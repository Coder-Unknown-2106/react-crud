import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams()
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]'))
    const navigate = useNavigate()

    const getSingleItem = productList.find((product) => product.id === Number(id))
    const [productName, setProductName] = useState(getSingleItem.productName)
    const [productPrice, setProductPrice] = useState(getSingleItem.productPrice)
    const [productQuanity, setProductQuanity] = useState(getSingleItem.productQuanity)

    const updateItems = (newItems) => {
        setProductList(newItems)
        localStorage.setItem(`${loggedUser.userName} products`, JSON.stringify(newItems));
    }
    console.log(productName, productPrice, productQuanity);

    function handleSubmit() {
        const editProduct = productList.map((product) => product.id === Number(id) ? { ...product, productName, productPrice, productQuanity: productQuanity } : product)
        updateItems(editProduct)
        // reset()
        navigate('/listProduct')

    }

    return (
        <div>
            <form onSubmit={() => handleSubmit()}>
                <div className=" d-grid justify-content-center my-5">
                    <h1 className=" text-center py-2">Product Add</h1>
                    <div>
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className={`form-control`} name="" id="ProductName"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="form-label">Product Quantity</label>
                        <input type="text" className={`form-control mb-3 `} name="" value={productQuanity} onChange={(e) => setProductQuanity(e.target.value)} id="quantity"

                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="text"
                            className={`form-control mb-3`} name="" id="price"
                            value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-dark my-3">UPDATE PRODUCT</button>
                </div>
            </form>
        </div>
    )
}

export default EditProduct