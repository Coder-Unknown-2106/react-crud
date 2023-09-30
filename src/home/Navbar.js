import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaReact } from "react-icons/fa";
import { useCustomizeContext } from '../context/Context';
const Navbar = () => {
    const navigate = useNavigate()
    const loggedUser = JSON.parse(localStorage.getItem('logged'))
    const { declareState: {
        logOutSession
    } } = useCustomizeContext()
    return (
        <nav className="navbar navbar-expand-lg bg-primary text-white pt-3">
            <div className="container">
                <p className="navbar-brand fs-1 text-white" role='button' onClick={() => navigate('/')} ><FaReact /></p>
                <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarControl" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarControl">
                    <ul className="navbar-nav ms-auto fw-bold  mb-2 mb-lg-0 nav-li-color">

                        {loggedUser ? <li role='button' onClick={() => navigate('/dashboard')} className="nav-item me-2 btn btn-outline-dark">
                            DashBoard
                        </li> :
                            <li role='button' onClick={() => navigate('/register')} className="nav-item me-2 btn btn-outline-dark">
                                Register
                            </li>
                        }

                        {loggedUser ? <li role='button' onClick={() => logOutSession()} className="nav-item me-2 btn btn-outline-dark ms-2">
                            Logout
                        </li> : <li role='button' onClick={() => navigate('/login')} className="nav-item me-2 btn btn-outline-dark ms-2">
                            Login
                        </li>}
                        {loggedUser &&
                            <li role='button' onClick={() => navigate('/addProduct')} className="nav-item me-2 btn btn-outline-dark ms-2">
                                Add Product
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar




