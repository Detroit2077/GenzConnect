import React, { useEffect } from "react";
import Input from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import authSer from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStatus } from "./Slicer/dataSlicer";
import { AppDispatch } from "./store/store";

const SignupComponent: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const formSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            dispatch(loginStatus());
            const session = await authSer.createAccount(data);
            if (session) {
                const useData = await authSer.getCurrentUser();
                if (useData) {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        authSer.getCurrentUser().then((result) => {
            if (result) {
                navigate("/");
            }
        });
    }, [navigate]);
    interface FormData {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    return (
        <div className="font-bold flex justify-center items-center ">
            <div className="rounded-lg bg-white p-8 w-1/3">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="text-center font-sans font-bold text-3xl text-blue-400">
                        Start a new journey...
                    </div>
                    <Input
                        classnameforInput="bg-pink-200 text-0.7xl p-3"
                        classnameforLabel="text-xl"
                        label="Name:"
                        placeholder={"Name:"}
                        {...register("name", { required: true })}
                    />
                    <Input
                        classnameforInput="bg-pink-200 text-0.7xl p-3"
                        classnameforLabel="text-xl"
                        label="Email:"
                        placeholder={"Enter your email:"}
                        {...register("email", { required: true })}
                    />
                    <Input
                        classnameforInput="bg-pink-200 text-0.7xl p-3"
                        classnameforLabel="text-xl"
                        placeholder={"Password"}
                        label={"Password"}
                        {...register("password", { required: true })}
                    />
                    <Input
                        classnameforInput="bg-pink-200 text-0.7xl p-3"
                        classnameforLabel="text-xl"
                        placeholder={"Confirm Password"}
                        label={"Confirm Password"}
                        {...register("confirmPassword", { required: false })}
                    />
                    <div className="text-center flex flex-col justify-center">
                        <div>
                            <button
                                className="bg-blue-600 hover:bg-purple-400 text-1xl p-3 w-1/3 px-6 mt-3 font-bold rounded-lg text-white"
                                type="submit"
                            >
                                Signup
                            </button>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                className="font-bold underline hover:text-blue-500 my-2"
                            >
                                Already have an account? Go to Login Page
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;
