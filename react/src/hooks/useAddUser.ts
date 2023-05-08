import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constance";
import { User } from "./useUsers";
import APIClient from "../react-query/services/apiClient";

interface AddUserContext {
    previousUser: User[];
}
const apiClient = new APIClient<User>("/signup");
const useAddUser = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<User, Error, User, AddUserContext>({
        mutationFn: apiClient.post,
        onMutate: (newUser: User) => {
            const previousUser =
                queryClient.getQueryData<User[]>(CACHE_KEY_TODOS) || [];
            queryClient.setQueryData<User[]>(CACHE_KEY_TODOS, (users = []) => [
                newUser,
                ...users,
            ]);

            onAdd();

            return { previousUser };
        },
        onSuccess: (savedUser, newUser) => {
            //savedUser is the data we get from backend
            queryClient.setQueryData<User[]>(CACHE_KEY_TODOS, (users) =>
                users?.map((user) => (user === newUser ? savedUser : user))
            );
        },
        onError: (error, newUser, context) => {
            if (!context) return;
            queryClient.setQueryData<User[]>(
                CACHE_KEY_TODOS,
                context.previousUser
            );
        },
    });
};
export default useAddUser;
