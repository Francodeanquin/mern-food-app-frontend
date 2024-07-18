import { useGetMyRestaurant, userCreateMyRestaurant, useUpdateMyRestaurant } from '../api/MyRestaurantApi'
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = userCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()

    const isEditing = !!restaurant;
    return (
        <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={isCreateLoading || isUpdateLoading} />
    )
}

export default ManageRestaurantPage