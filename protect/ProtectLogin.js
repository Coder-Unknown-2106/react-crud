import { Navigate, Outlet } from 'react-router-dom'

const ProtectLogin = () => {

    const auth = JSON.parse(localStorage.getItem('logged'))

    return !auth ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectLogin