import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AutchCallbackPage from "./pages/AutchCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import ManageRestaurantPage from "./pages/ManageRestaurantPage"
import SearchPage from "./pages/SearchPage"
import DetailPage from "./pages/DetailPage"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero={true}>{<HomePage />}</Layout>} />

            <Route path="/auth-callback" element={<AutchCallbackPage />} />
            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage /></Layout>} />
            <Route path="/detail/:restaurantId" element={<Layout showHero={false}><DetailPage /></Layout>} />

            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout showHero={false}><UserProfilePage /></Layout>} />
                <Route path="/manage-restaurant" element={<Layout showHero={false}><ManageRestaurantPage /></Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />


        </Routes>)
}


export default AppRoutes