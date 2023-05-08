import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constance";
import APIClient from "../react-query/services/apiClient";
export interface User {
    // id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
const apiClient = new APIClient<User>("/users");
const useUsers = () => {
    return useQuery<User[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: apiClient.getAll,
        staleTime: 1 * 60 * 1000, //im
    });
};
export default useUsers;
