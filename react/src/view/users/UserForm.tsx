import React, { useRef } from "react";
import useAddUser from "../../hooks/useAddUser";

const UserForm = () => {
    const ref = useRef<HTMLInputElement>(null);
    const addUser = useAddUser(() => {
        if (ref.current) ref.current.value = "";
    });

    return (
        <>
            {addUser.error && (
                <div className="alert alert-danger">
                    {addUser.error.message}
                </div>
            )}

            <form
                className="row mb-3"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    if (ref.current && ref.current.value)
                        addUser.mutate({
                            // id: 0,
                            name: ref.current?.value,
                            email: "newUpata2Emal@gmail.com",
                            password: "Basharmal!@#1",
                            password_confirmation: "Basharmal!@#1",
                        });
                }}
            >
                <div className="col">
                    <input ref={ref} type="text" className="form-control" />
                    {/* <input ref={ref} type="text" className="form-control" /> */}
                </div>
                <div className="col">
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </>
    );
};

export default UserForm;
