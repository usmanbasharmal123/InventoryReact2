import APIClient from "./apiClient";
export interface User {
    // id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default new APIClient<User>("/signup");
