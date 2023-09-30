import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListProduct = () => {
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loggedUser.userName} products`) || '[]'));
    const navigate = useNavigate()
    // setLocalstorage
    const updateItems = (newItems) => {
        setProductList(newItems);
        localStorage.setItem(`${loggedUser.userName} products`, JSON.stringify(newItems));
    }
    // deleteProduct
    const handleDeleteList = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteListUpdate = productList.filter((product) => product.id !== id)
                updateItems(deleteListUpdate)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

            }
        })
    }
    return (
        <div className=' container my-5'>
            {productList.length > 0 ?
                <table className=' table table-bordered'>
                    <thead className='tableHead '>
                        <th>ProductName</th>
                        <th>ProductQuantity</th>
                        <th>ProductPrice</th>
                        <th>Changeable</th>
                        <th>Action</th>
                    </thead>
                    {productList.map((product) => (
                        <tr key={product.id} style={{ minHeight: '100px' }}>
                            <td>{product.productName}</td>
                            <td>{product.productQuanity}</td>
                            <td>{product.productPrice}</td>
                            <td>
                                <span><button onClick={() => navigate(`edit/${product.id}`)} className='btn btn-primary '>Edit</button></span>
                            </td>
                            <td>
                                <span> <button className='btn btn-danger' onClick={() => handleDeleteList(product.id)}>Delete</button></span>
                            </td>
                        </tr>
                    ))}
                </table>

                : <p>No items</p>}




        </div>
    )
}

export default ListProduct