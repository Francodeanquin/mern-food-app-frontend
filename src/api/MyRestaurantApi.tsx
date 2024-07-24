import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get restaurant")

        }
        return response.json()
    }

    const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant",
        getMyRestaurantRequest
    )
    return { restaurant, isLoading }
}
export const userCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        const responseData = await response.json();
        console.log("Response data: ", responseData); // Log para ver la respuesta del servidor

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to create restaurant");
        }

        return responseData;
    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }

    if (error) {
        toast.error(`Unable to update restaurant: ${error}`);
    }

    return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: restaurantFormData
        });

        const responseData = await response.json();
        console.log("Response data: ", responseData); // Log para ver la respuesta del servidor

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to update restaurant");
        }

        return responseData;
    };

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated!");
    }

    if (error) {
        toast.error(`Unable to update restaurant: ${error}`);
    }

    return { updateRestaurant, isLoading };
};


export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch orders")
        }

    }

    const { data: orders, isLoading } = useQuery("fetchMyRestaurantOrderds", getMyRestaurantOrdersRequest)


    return { orders, isLoading }
}

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string
}
export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
        const accesToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accesToken}`,
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                status: updateStatusOrderRequest.status
            })
        })
        if (!response.ok) {
            throw new Error("Failed to update status")
        }

        return response.json();
    }

    const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantOrder)

    if (isSuccess) {
        toast.success("Order updated")
    }
    if (isError) {
        toast.error("Unable to update order")
        reset()
    }

    return { updateRestaurantStatus, isLoading }
}