import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/pages/Login.tsx";
import Signup from "./components/pages/Signup.tsx";
import Home from "./components/pages/Home.tsx";
import { Provider } from "react-redux";
import store from "./components/store/store.ts";
import AuthenticationCheck from "./components/AuthenticationCheck.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <AuthenticationCheck authentication={true}>
                        <Home />
                    </AuthenticationCheck>
                ),
            },
            {
                path: "/login",
                element: (
                    <AuthenticationCheck authentication={false}>
                        <Login />
                    </AuthenticationCheck>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthenticationCheck authentication={false}>
                        <Signup />
                    </AuthenticationCheck>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
