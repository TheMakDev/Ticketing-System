import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    // Make sure credentials are included in requests
    axios.defaults.withCredentials = true;

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); // set to null initially

    // Check authentication status
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/auth/is-auth`, { withCredentials: true });
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();  // Fetch user data if authenticated
            } else {
                setIsLoggedIn(false);  // User not authenticated
            }
        } catch (error) {
            setIsLoggedIn(false);
            // Toast error if authentication check fails
            toast.error(error.response?.data?.message || "Failed to check authentication");
        }
    };

    // Fetch user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/user/data`, { withCredentials: true });
            if (data.success) {
                setUserData(data.userData);  // Set user data
            } else {
                toast.error(data.message);  // Handle failure in fetching user data
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
    };

    // Check auth status on initial load
    useEffect(() => {
        getAuthState();
    }, []);  // Empty dependency array to run only once on component mount

    // Context value for provider
    const value = {
        backendurl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
