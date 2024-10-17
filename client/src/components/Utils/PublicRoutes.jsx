import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { refreshAccessToken } from "../../services/postApi";
import { setAccessToken } from "../../Redux/feathers/auth";

let cmpntInitialized = false;

const PublicRoutes = () => {
    const { userLoading, accessToken, isLoggedIn } = useSelector(state => state.auth);
    const [displayPage, setDisplayPage] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshTokenIfNeeded = async () => {
            if (!isLoggedIn && accessToken) {
                if (cmpntInitialized) {
                    setDisplayPage(true);  
                    return;
                }

                cmpntInitialized = true;
                console.log("Refreshing access token...");

                try {
                    const response = await refreshAccessToken();
                    const newAccessToken = response.accessToken;
                    dispatch(setAccessToken(newAccessToken)); // Update access token in Redux store
                } catch (error) {
                    console.error("Failed to refresh access token", error);
                } finally {
                    setDisplayPage(true); 
                }
            } else {
                setDisplayPage(true);
            }
        };

        refreshTokenIfNeeded();
    }, [isLoggedIn, accessToken, dispatch]);

    if (userLoading) {
        return <div>Loading...</div>; 
    }

    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return displayPage ? <Outlet /> : null; 
};

export default PublicRoutes;
