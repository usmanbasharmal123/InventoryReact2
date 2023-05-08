import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ToastContainer } from "react-toastify";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { useForm, Controller } from "react-hook-form";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { toast } from "react-toastify";
import axiosClient from "../../axios";

import RingLoader from "react-spinners/RingLoader";
const override = {
    display: "block",
    margin: "0 auto",
};
export default function Users() {
    const toast = useRef(null);
    let emptyUser = {
        // id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
    let [loading, setLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [ero, setEro] = useState("");
    const [userId, setUserId] = useState("");
    // const toast = useRef(null);

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    // const toast = useRef(null);
    const dt = useRef(null);

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    const fetchData = async () => {
        setLoading(true);
        setSelectedUsers(null);
        reset();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        await axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
        reset,

        setValue,
        getValues,
    } = useForm({ emptyUser });
    // useEffect(() => {
    //     reset({
    //         name: user.name,
    //         email: user.email,
    //         password: user.password,
    //         password_confirmation: user.password_confirmation,
    //     });
    // }, [reset, user]);

    const getFormErrorMessage = (name) => {
        // console.log("errors " + errors[name].message);
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = async () => {
        reset();

        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const editUser = async (user) => {
        // useEffect(() => {
        reset({
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
        });
        // setEro("");
        // if (user.password_confirmation === user.password) {
        //     await axiosClient
        //         .put(`/update/user/${user.id}`, {
        //             name: user.name,
        //             email: user.email,
        //             password: user.password,
        //             password_confirmation: user.password_confirmation,
        //         })
        //         .then(async ({ data1 }) => {
        //             showMessages(
        //                 "success",
        //                 "Success",
        //                 "User Updated Successfully"
        //             );
        //             setUserDialog(false);
        //             setTimeout(() => {
        //                 fetchData();
        //             }, 1000);
        //             // await setCurrentUser(data1.user);
        //             // await setUserToken(data1.token);
        //             setFormData(data1);
        //             // _users.push(data.user);
        //             // setShowMessage(true);
        //             reset();
        //         })
        //         .catch((error) => {
        //             if (error.response) {
        //                 const finalErrors = Object.values(
        //                     error.response.data.errors
        //                 ).reduce((accum, next) => [...accum, ...next], []);
        //                 // if (data.password_confirmation !== data.password) {
        //                 //     getFormErrorMessage2('"password_confirmation"');
        //                 // }
        //                 // //  setErrors(finalErrors);
        //                 // showMessages(
        //                 //     "error",
        //                 //     "Error",
        //                 //     "User updated Successfully"
        //                 // );
        //                 setUserDialog(false);
        //                 setTimeout(async () => {
        //                     await fetchData();
        //                 }, 2000);
        //                 console.log(error);
        //             }
        //         });
        // } else {
        //     setEro("The password  confirmation field does not match");
        //     showMessages(
        //         "error",
        //         "Error",
        //         "The password  confirmation field does not match"
        //     );
        //     setUserDialog(true);
        //     // console.log("your are here");
        // }
        // setFormData(user);

        try {
            await axiosClient.get(`/user/${user.name}`).then(({ data }) => {
                // console.log(data);

                //  showMessages(
                //      "success",
                //      "Success",
                //      "Users Deleted Successfully"
                //  );
                // console.log("edit user Id " + data);
                setUserId(data);
            });
            // setUsers(_users);
        } catch (error) {
            if (error.response && error.response.status === 404)
                alert("This user dosent existed!");
            else {
                console.log("Loggin the error", error);
                alert("An unexpected error occurred.");
            }
        }
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };
    const showMessages = (severity, summary, detail) => {
        toast.current.show({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 8000,
        });
    };
    const showSuccess2 = () => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Users Deleted Successfully",
            life: 8000,
        });
    };
    const showUsersNotSelected = () => {
        toast.current.show({
            severity: "error",
            summary: "error",
            detail: "Please select a Users List to be Deleted",
            life: 8000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };
    const deleteUser = async () => {
        try {
            await axiosClient
                .delete(`/delete/user/${user.id}`)
                .then((response) => {
                    showMessages(
                        "success",
                        "Success",
                        "User Deleted Successfully"
                    );
                });
            // setUsers(_users);
        } catch (error) {
            if (error.response && error.response.status === 404)
                alert("This user is already deleted!");
            else {
                console.log("Loggin the error", error);
                alert("An unexpected error occurred.");
            }
            // setUsers(originalUsers);
            // setUser(emptyUser);
        }
        setDeleteUserDialog(false);
        // showSuccess();
        setTimeout(() => {
            fetchData();
        }, 1000);

        //    console.log("out repo");
    };
    const deleteSelectedUsers = async () => {
        // let _users = users.filter((val) => !selectedUsers.includes(val));
        const multiUsersSelectd = selectedUsers.map((user) => {
            return user.id;
        });
        if (multiUsersSelectd) {
            try {
                await axiosClient
                    .delete(`/delete/users/${multiUsersSelectd}`)
                    .then((response) => {
                        showMessages(
                            "success",
                            "Success",
                            "Users Deleted Successfully"
                        );
                    });
                // setUsers(_users);
            } catch (error) {
                if (error.response && error.response.status === 404)
                    alert("This users is already deleted!");
                else {
                    console.log("Loggin the error", error);
                    alert("An unexpected error occurred.");
                }
            }
        } else {
            showUsersNotSelected();
        }
        setDeleteUsersDialog(false);
        // showSuccess();
        setTimeout(() => {
            fetchData();
        }, 1000);

        // console.log(selectedUsers);

        // // console.log(_users);

        // setUsers(_users);
        // setDeleteUsersDialog(false);
        // // set(null);
        // setSelectedUsers(null);
        // toast.current.show({
        //     severity: "success",
        //     summary: "Successful",
        //     detail: "users Deleted",
        //     life: 3000,
        // });
    };

    const onCategoryChange = (e) => {
        let _user = { ...user };

        _user["category"] = e.value;
        setUser(_user);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
    };
    // const saveUser = () => {
    //     // console.log(name);
    //     // setEro("");
    //     setSubmitted(true);

    //     // if (user.name.trim()) {
    //     // let _users = [...users];
    //     // let _user = { ...user };

    //     if (user.id) {
    //         const index = findIndexById(user.id);

    //         _users[index] = _user;
    //         toast.current.show({
    //             severity: "success",
    //             summary: "Successful",
    //             detail: "User Updated",
    //             life: 3000,
    //         });
    //     } else {
    //         // _user.id = createId();
    //         // _user.image = "user-placeholder.svg";
    //         // _users.push(_user);
    //      let _users = [...users];

    //         if (user.password_confirmation === user.password) {
    //             axiosClient
    //                 .post("/signup", {
    //                     name: user.name,
    //                     email: user.email,
    //                     password: user.password,
    //                     password_confirmation: user.password_confirmation,
    //                 })
    //                 .then(({ data }) => {
    //                     // setCurrentUser(data.user);
    //                     // setUserToken(data.token);
    //                     // setFormData(data);
    //                     // setShowMessage(true);
    //                     // reset();
    //                     toast.current.show({
    //                         severity: "success",
    //                         summary: "Successful",
    //                         detail: "User Created",
    //                         life: 3000,
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     if (error.response) {
    //                         // const finalErrors = Object.values(
    //                         //     error.response.data.errors
    //                         // ).reduce((accum, next) => [...accum, ...next], []);
    //                         // if (data.password_confirmation !== data.password) {
    //                         //     getFormErrorMessage2('"password_confirmation"');
    //                         // }
    //                         // //  setErrors(finalErrors);
    //                         console.log(error);
    //                     }
    //                 });
    //         } else {
    //             setEro("The password  confirmation field does not match");
    //             // console.log("your are here");
    //         }
    //     }

    //     // setUsers(_users);
    //     // _users.push(_user);
    //     // let _users = [...users];
    //     // setUserDialog(false);
    //     // setUser(emptyUser);
    //     }
    // };
    const onSubmit = async (data) => {
        // setEro("");

        // console.log(userId);

        if (userId) {
            if (data.password_confirmation === data.password) {
                await axiosClient
                    .put(`/update/user/${userId}`, {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        password_confirmation: data.password_confirmation,
                    })
                    .then(({ data }) => {
                        console.log(data);
                        console.log(data.token);
                        console.log("here you are ");
                        setCurrentUser(data.user);
                        setUserToken(data.token);
                        showMessages(
                            "success",
                            "Success",
                            "User Updated Successfully"
                        );
                        setUserDialog(false);
                        setTimeout(() => {
                            fetchData();
                        }, 1000);
                        setFormData(data);
                        // _users.push(data.user);
                        // setShowMessage(true);

                        reset();
                    })
                    .catch((error) => {
                        if (error.response) {
                            const finalErrors = Object.values(
                                error.response.data.errors
                            ).reduce((accum, next) => [...accum, ...next], []);
                            // if (data.password_confirmation !== data.password) {
                            //     getFormErrorMessage2('"password_confirmation"');
                            // }
                            // //  setErrors(finalErrors);
                            showMessages(
                                "error",
                                "Error",
                                "Some error occurd while update"
                            );
                            setUserDialog(false);
                            setTimeout(async () => {
                                await fetchData();
                            }, 2000);
                            console.log(error);
                        }
                    });
            } else {
                setEro("The password  confirmation field does not match");
                showMessages(
                    "error",
                    "Error",
                    "The password  confirmation field does not match"
                );
                setUserDialog(true);
                // console.log("your are here");
            }
        } else {
            if (data.password_confirmation === data.password) {
                await axiosClient
                    .post("/signup", {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        password_confirmation: data.password_confirmation,
                    })
                    .then(({ data }) => {
                        setCurrentUser(data.user);
                        setUserToken(data.token);
                        showMessages(
                            "success",
                            "Success",
                            "User Inserted Successfully"
                        );
                        setUserDialog(false);
                        setTimeout(() => {
                            fetchData();
                        }, 1000);
                        setFormData(data);
                        // _users.push(data.user);
                        // setShowMessage(true);

                        reset();
                    })
                    .catch((error) => {
                        if (error.response) {
                            const finalErrors = Object.values(
                                error.response.data.errors
                            ).reduce((accum, next) => [...accum, ...next], []);
                            // if (data.password_confirmation !== data.password) {
                            //     getFormErrorMessage2('"password_confirmation"');
                            // }
                            // //  setErrors(finalErrors);
                            showMessages(
                                "error",
                                "Error",
                                "Some error occurd while insertion"
                            );
                            setUserDialog(false);
                            setTimeout(async () => {
                                await fetchData();
                            }, 2000);
                            console.log(error);
                        }
                    });
            } else {
                setEro("The password  confirmation field does not match");
                showMessages(
                    "error",
                    "Error",
                    "The password  confirmation field does not match"
                );
                setUserDialog(true);
                // console.log("your are here");
            }
            // data.name = "";
            // console.log("you are here 2");
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
                {/* <PrimeIcons /> */}
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedUsers || !selectedUsers.length}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    severity="warning"
                    className="mr-2"
                    onClick={() => editUser(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteUser(rowData)}
                />
            </>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage users</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    className="p-inputtext-sm rounded "
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    // style={{ borderradius: "25px" }}
                    // rounded
                />
            </span>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            {/* <Button
                label="Close"
                icon="pi pi-times"
                // outlined
                onClick={hideDialog}
                severity="secondary"
            /> */}
            {/* <Button type="submit" label="Save" icon="pi pi-check" /> */}
            {/* <Button
                type="submit"
                label="Save"
                icon="pi pi-check"
                onClick={saveUser}
            /> */}
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <>
            <Button
                className=""
                label="Close"
                severity="info"
                icon="pi pi-times"
                raised
                onClick={hideDeleteUserDialog}
            />

            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                raised
                onClick={deleteUser}
            />
        </>
    );
    const deleteUsersDialogFooter = (
        <>
            <Button
                className=""
                label="Close"
                severity="info"
                icon="pi pi-times"
                raised
                onClick={hideDeleteUsersDialog}
            />

            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                raised
                onClick={deleteSelectedUsers}
            />
        </>
    );

    return (
        <>
            {loading ? (
                <RingLoader
                    color={"#0949ff"}
                    loading={loading}
                    cssOverride={override}
                    display={"block"}
                    size={350}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        <Toolbar
                            className="mb-4"
                            left={leftToolbarTemplate}
                            right={rightToolbarTemplate}
                        ></Toolbar>

                        <DataTable
                            ref={dt}
                            value={users}
                            selection={selectedUsers}
                            onSelectionChange={(e) => setSelectedUsers(e.value)}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                            globalFilter={globalFilter}
                            header={header}
                        >
                            <Column
                                selectionMode="multiple"
                                exportable={false}
                            ></Column>
                            <Column
                                field="id"
                                header="Id"
                                sortable
                                style={{ minWidth: "12rem" }}
                            ></Column>
                            <Column
                                field="name"
                                header="Name"
                                sortable
                                style={{ minWidth: "16rem" }}
                            ></Column>

                            <Column
                                field="email"
                                header="Emailmail"
                                sortable
                                style={{ minWidth: "8rem" }}
                            ></Column>

                            <Column
                                body={actionBodyTemplate}
                                exportable={false}
                                style={{
                                    minWidth: "12rem",
                                    color: "red",
                                }}
                            ></Column>
                        </DataTable>
                    </div>

                    <Dialog
                        visible={userDialog}
                        style={{ width: "32rem" }}
                        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                        header="User Details"
                        modal
                        className="p-fluid"
                        footer={userDialogFooter}
                        onHide={hideDialog}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-fluid"
                        >
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required: "Name is required.",
                                        }}
                                        render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                // {...register("name")}
                                                // ref={register}
                                                autoFocus
                                                className={classNames({
                                                    "p-invalid":
                                                        fieldState.invalid,
                                                })}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="name"
                                        className={classNames({
                                            "p-error": errors.name,
                                        })}
                                    >
                                        Name*
                                    </label>
                                </span>
                                {getFormErrorMessage("name")}
                            </div>
                            <div className="field" style={{ marginTop: 8 }}>
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message:
                                                    "Invalid email address. E.g. example@email.com",
                                            },
                                        }}
                                        render={({ field, fieldState }) => (
                                            <InputText
                                                id={field.name}
                                                {...field}
                                                className={classNames({
                                                    "p-invalid":
                                                        fieldState.invalid,
                                                })}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={classNames({
                                            "p-error": !!errors.email,
                                        })}
                                    >
                                        Email*
                                    </label>
                                </span>
                                {getFormErrorMessage("email")}
                            </div>
                            <div className="field" style={{ marginTop: 8 }}>
                                <span className="p-float-label">
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: "Password is required.",
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Password
                                                id={field.name}
                                                {...field}
                                                toggleMask
                                                className={classNames({
                                                    "p-invalid":
                                                        fieldState.invalid,
                                                })}
                                                header={passwordHeader}
                                                footer={passwordFooter}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="password"
                                        className={classNames({
                                            "p-error": errors.password,
                                        })}
                                    >
                                        Password*
                                    </label>
                                </span>
                                {getFormErrorMessage("password")}
                            </div>
                            <div className="field" style={{ marginTop: 8 }}>
                                <span className="p-float-label">
                                    <Controller
                                        name="password_confirmation"
                                        control={control}
                                        rules={{
                                            required:
                                                "password_confirmation is required.",
                                            confirmed:
                                                "The password field confirmation does not match",
                                        }}
                                        render={({ field, fieldState }) => (
                                            <Password
                                                id={field.name}
                                                {...field}
                                                toggleMask
                                                className={classNames({
                                                    "p-invalid":
                                                        fieldState.invalid,
                                                })}
                                                header={passwordHeader}
                                                footer={passwordFooter}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="password_confirmation"
                                        className={classNames({
                                            "p-error":
                                                errors.password_confirmation,
                                        })}
                                    >
                                        Password Confirmation*
                                    </label>
                                </span>
                                {getFormErrorMessage("password_confirmation")}

                                <small className="p-error">{ero}</small>
                            </div>

                            <div
                                className="field-checkbox"
                                style={{ marginTop: 16 }}
                            >
                                <Controller
                                    name="accept"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Checkbox
                                            inputId={field.name}
                                            onChange={(e) =>
                                                field.onChange(e.checked)
                                            }
                                            checked={field.value}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="accept"
                                    className={classNames({
                                        "p-error": errors.accept,
                                    })}
                                >
                                    I agree to the terms and conditions*
                                </label>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    marginTop: 22,
                                    marginBottom: 0,
                                }}
                            >
                                <Button
                                    type="submit"
                                    label="Save"
                                    small
                                    raised
                                />
                            </div>
                        </form>
                    </Dialog>

                    <Dialog
                        visible={deleteUserDialog}
                        style={{ width: "32rem", color: "black" }}
                        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                        header="Confirm"
                        modal
                        footer={deleteUserDialogFooter}
                        onHide={hideDeleteUserDialog}
                    >
                        <div className="confirmation-content">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: "2rem", color: "orange" }}
                            />
                            {user && (
                                <span
                                    style={{ fontSize: "1rem", color: "black" }}
                                >
                                    Are you sure you want to delete{" "}
                                    <b>{user.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteUsersDialog}
                        style={{ width: "32rem" }}
                        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                        header="Confirm"
                        modal
                        footer={deleteUsersDialogFooter}
                        onHide={hideDeleteUsersDialog}
                    >
                        <div
                            className="confirmation-content"
                            icon="pi pi-search"
                        >
                            {users && (
                                <span
                                    style={{ fontSize: "1rem", color: "red" }}
                                >
                                    <i
                                        className="pi pi-exclamation-circle"
                                        style={{
                                            fontSize: "3rem",
                                            color: "orange",
                                        }}
                                    ></i>{" "}
                                    Are you sure you want to delete the selected
                                    users?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            )}
        </>
    );
}
