import React, { useEffect } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import authSer from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { loginStatus } from "./Slicer/dataSlicer";

const LoginComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm<FormData>();

    const login = async (data: FormData) => {
        try {
            dispatch(loginStatus());
            const session = await authSer.userLogin(data);
            if (session) {
                const userData = await authSer.getCurrentUser();
                if (userData) {
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
        email: string;
        password: string;
    }
    return (
        <div className="flex justify-center items-center font-bold ">
            <div className="rounded-lg bg-white p-8 w-1/3">
                <form onSubmit={handleSubmit(login)}>
                    <div className="text-center font-sans font-bold text-2xl text-blue-400">
                        Continue your journey...
                    </div>
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
                    <div className="text-center flex flex-col justify-center">
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-purple-400 text-1xl p-3 w-1/3 px-6 mt-3 font-bold rounded-lg text-white"
                            >
                                Login/SignIn
                            </button>
                        </div>
                        <div>
                            <Link
                                to="/signup"
                                className="underline hover:text-blue-500 my-2"
                            >
                                Don't have an account? Go to Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
