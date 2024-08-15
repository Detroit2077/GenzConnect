import React from "react";
import authSer from "../appwrite/auth";
import { logoutStatus } from "./Slicer/dataSlicer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useNavigate } from "react-router-dom";

const LogoutBtn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLgout = async () => {
        try {
            const loggedout = await authSer.userLogout();
            dispatch(logoutStatus());
            if (loggedout) {
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <button
                onClick={handleLgout}
                className="bg-blue-500 rounded-lg p-2"
            >
                Log out
            </button>
        </div>
    );
};

export default LogoutBtn;