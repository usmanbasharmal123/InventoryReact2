import useUsers from "../../hooks/useUsers";
import UserForm from "./UserForm";
const Users = () => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <p>Loading data...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <UserForm />
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Users;
