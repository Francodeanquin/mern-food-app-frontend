import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return null
    }
    if (isAuthenticated) {
        return < Outlet />
    }

    return <Navigate to="/" replace />
}

//Outlet es una propiedad de react router dom que basicamente permite renderizar todos los elementos hijos

export default ProtectedRoute