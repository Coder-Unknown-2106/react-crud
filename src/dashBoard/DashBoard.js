import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const navigate = useNavigate()
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]'));


    return (
        <div className=' container'>
            <div className=' d-grid justify-content-center my-3'>
                <p> <span className=' fw-bold'>UserID </span>: {loggedUser.id}</p>
                <p> <span className=' fw-bold'>Email</span> : {loggedUser.email}</p>
                <div>
                    <button onClick={() => navigate('/listProduct')} type="button" className='btn btn-primary me-2'>View Products</button>
                    <button onClick={() => navigate('/addProduct')} type="button" className='btn btn-warning'>Add Products</button>
                </div>
            </div>

            <div className=' container my-5'>
                {productList.length > 0 ?
                    <table className=' table table-bordered'>
                        <thead className=' table-primary'>
                            <th>ProductName</th>
                            <th>ProductQuantity</th>
                            <th>ProductPrice</th>
                        </thead>
                        {productList.slice(0, 3).map((product) => (
                            <tr key={product.id} style={{ minHeight: '100px' }}>
                                <td>{product.productName}</td>
                                <td>{product.productQuanity}</td>
                                <td>{product.productPrice}</td>
                            </tr>
                        ))}
                    </table>

                    : <p>No items</p>}




            </div>

        </div>
    )
}

export default DashBoard