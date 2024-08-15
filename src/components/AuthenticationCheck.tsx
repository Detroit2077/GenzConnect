import { RootState } from "./store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface authProps {
    children: React.ReactNode;
    authentication: boolean;
}
const AuthenticationCheck: React.FC<authProps> = ({
    children,
    authentication = true,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const statusChecker = useSelector(
        (state: RootState) => state.userData.status
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (authentication && statusChecker !== authentication) {
            navigate("/login");
        } else if (!authentication && statusChecker !== authentication) {
            navigate("/");
        }
        setLoading(false);
    }, [navigate, statusChecker]);
    return loading ? <h1>Loading</h1> : <>{children}</>;
};

export default AuthenticationCheck;
