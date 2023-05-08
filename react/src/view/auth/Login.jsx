import React, { useEffect, useState, CSSProperties, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Badge } from "primereact/badge";
import axiosClient from "../../axios";
import { useStateContext } from "../../context/ContextProvider";
// import { Toast } from "primereact/toast";

const LoginPage = () => {
    // const toast = useRef(null);
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        useStateContext();
    // const showSuccess = () => {
    //     toast.current.show({
    //         severity: "success",
    //         summary: "Success",
    //         detail: "Message Content",
    //         life: 3000,
    //     });
    // };
    // const navigate = useNavigate();
    if (userToken) {
        return <Navigate to="/" />;
        // return navigate("/",{state:{onClick=}});
    }

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [ero, setEro] = useState("");
    const defaultValues = {
        email: "",
        password: "",
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setEro("");

        axiosClient
            .post("/login", {
                email: data.email,
                password: data.password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                setFormData(data);
                setShowMessage(true);
                // showSuccess;
                reset();
            })
            .catch((error) => {
                if (error.response) {
                    // const finalErrors = Object.values(
                    //     error.response.data.errors
                    // ).reduce((accum, next) => [...accum, ...next], []);
                    // if (data.password_confirmation !== data.password) {
                    //     getFormErrorMessage2('"password_confirmation"');
                    // }
                    // //  setErrors(finalErrors);
                    setEro("The Provided credentials are not correct");

                    console.log(error);
                }
            });
    };

    const getFormErrorMessage = (name) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };

    const dialogFooter = (
        <div className="flex justify-content-center">
            <Button
                label="OK"
                className="p-button-text"
                autoFocus
                onClick={() => setShowMessage(false)}
            />
        </div>
    );
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

    return (
        <>
            <div className="form-demo">
                <Dialog
                    visible={showMessage}
                    onHide={() => setShowMessage(false)}
                    position="top"
                    footer={dialogFooter}
                    showHeader={false}
                    breakpoints={{ "960px": "80vw" }}
                    style={{ width: "30vw" }}
                >
                    <div className="flex justify-content-center flex-column pt-6 px-3">
                        <i
                            className="pi pi-check-circle"
                            style={{
                                fontSize: "5rem",
                                color: "var(--green-500)",
                            }}
                        ></i>
                        <h5>Login Successful!</h5>
                        <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                            Welcome to the Dashboard <b>Mr {formData.name}</b>{" "}
                            Your Email is <b>{formData.email}</b>{" "}
                        </p>
                    </div>
                </Dialog>

                <div className="flex justify-content-center">
                    <div className="card">
                        <h4 style={{ textAlign: "center", marginBottom: 5 }}>
                            Login
                        </h4>
                        {/* <Toast ref={toast} />
                        <Button
                            label="Success"
                            className="p-button-success"
                            onClick={showSuccess}
                        /> */}

                        {ero && <Badge value={ero} severity="danger"></Badge>}

                        {/* </h4> */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-fluid"
                        >
                            <div className="field">
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
                            <div className="field">
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

                            <div className="field-checkbox">
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
                                    Remember me*
                                </label>
                            </div>

                            <Button
                                type="submit"
                                label="Login"
                                className="mt-2"
                            />
                        </form>
                    </div>
                </div>
            </div>

            {/* )} */}
        </>
    );
};

export default LoginPage;
