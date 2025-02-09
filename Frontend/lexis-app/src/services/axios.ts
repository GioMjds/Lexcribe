import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const API_2 = axios.create({
    baseURL: import.meta.env.VITE_API_URL2,
});

interface SurveyResponse {
    [key: string]: string | { main: string; q3_sub: string };
}

export const getUserDetails = async () => {
    try {
        const response = await API.get(`/profile/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to fetch user details: ${error}`);
        throw error;
    }
};

export const sendPrompt = async (url: string, input: string) => {
    try {
        const response = await API.post(`${url}/prompt/`, {
            input: input
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to send prompt: ${error}`);
        throw error;
    }
};

export const logOut = async (url: string) => {
    try {
        const response = await API.post(`${url}/logout/`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to log out user: ${error}`);
        throw error;
    }
};

export const sendOtpForReset = async (url: string, otpCode: string) => {
    try {
        const email = sessionStorage.getItem("email");
        const response = await API.post(`${url}/email-otp/`, {
            otpCode: otpCode,
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to send OTP for Reset Password: ${error}`);
        throw error;
    }
};

export const sendEmailOtp = async (email: string, url: string) => {
    try {
        const response = await API.post(`${url}/email-otp/`, {
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to send OTP: ${error}`);
        throw error;
    }
};

export const registerUser = async (otpCode: string, url: string) => {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    try {
        const response = await API.post(`${url}/register/`, {
            email: email,
            username: username,
            password: password,
            otpCode: otpCode
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to register user: ${error}`);
        throw error;
    }
}

export const handleSignUp = async (username: string, email: string, password: string, confirm: string, url: string) => {
    try {
        const response = await API.post(`${url}/signup/`, {
            username: username,
            email: email.toLowerCase(),
            password: password,
            confirm: confirm
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to sign up: ${error}`);
        throw error;
    }
};

export const handleLogin = async (email: string, password: string, url: string) => {
    try {
        const response = await API.post(`${url}/login/`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error(`Failed to login user: ${error}`);
        throw error;
    }
}

export const handleNewPassword = async (newPassword: string, apiUrl: string) => {
    try {
        const response = await API.post(`${apiUrl}/reset-password/confirm`, {
            password: newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json',
            }
        });
        return response
    } catch (error) {
        console.error(`Failed to reset password: ${error}`);
        throw error;
    }
};

export const sendEmailForReset = async (url: string, email: string) => {
    try {
        const response = await API.post(`${url}/reset-password/email/`, {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response;
    } catch (error) {
        console.error(`Failed to send email for reset: ${error}`);
        throw error;
    }
}

export const sendSurveyAnswers = async (data: SurveyResponse) => {
    try {
        const response = await API_2.post('/answers/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json',
            }
        })
        return response;
    } catch (error) {
        console.error(`Failed to send survey answers: ${error}`);
        throw error
    }
};

export const chatHistory = async () => {
    // Connect the API endpoint for fetching the chat history here
}