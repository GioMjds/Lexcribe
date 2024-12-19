import { jwtDecode } from "jwt-decode";
import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

export const isTokenExpired = (token: string): boolean => {
    const decoded : {exp: number} = jwtDecode(token)

    const tokenExpiration = decoded.exp
    const currentTime = Date.now() / 1000;

    return tokenExpiration < currentTime
}


export const refreshUserToken = async() => {
    const refreshToken = localStorage.getItem("refresh_token");

    if(!refreshToken) {
        return false
    }

    if(isTokenExpired(refreshToken)){
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        return false
    }


    try {

        const response = await axios.post(`${apiUrl}/refresh/`,{ refresh: refreshToken})

        if(response.status === 200) {
            localStorage.setItem('access_token', response.data.access)
            return true
        }

        return false



    } catch(error) {
        console.log("Lexcribe is under maintenance. Please try again later");
        return false
    }
}


export const userAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        console.warn("No access token found.");
        return false;
    }

    if (isTokenExpired(accessToken)) {
        const response = await refreshUserToken();
        return response ?? false; 
    }

    return true; 
};
