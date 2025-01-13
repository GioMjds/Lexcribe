import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl2 = import.meta.env.VITE_API_URL2;

export const getUserDetails = async (url: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(`${url}/profile/`, {
        headers : {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    return response
}

export const sendPrompt = async (url: string, input: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${url}/prompt/`,{
        input: input
    }, {
        headers: {

            'Authorization': `Bearer ${accessToken}`,
        }
    })
    return response
}

export const logOut  = async (url: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${url}/logout/`,{}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    return response
}

export const sendOtpForReset = async (url: string, otpCode: string) => {
    const email = sessionStorage.getItem("email");
    const response = await axios.post(`${url}/email-otp/`, {
        otpCode: otpCode,
        email: email
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response
}

export const sendEmailOtp = async (email: string, url: string) =>  {
    const response = await axios.post(`${url}/email-otp/`, {
        email: email,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response
}

export const registerUser = async (otpCode :string, url:string) => {
   const email = sessionStorage.getItem("email");
   const username = sessionStorage.getItem("username");
   const password = sessionStorage.getItem("password");
   const response = await axios.post(`${url}/register/`,{
     email: email,
     username: username,
     password: password,
     otpCode : otpCode
   }, {
    headers : {
        "Content-Type": "application/json"
    }
   })
   return response
}

export const handleSignUp  = async (username: string, email: string, password: string, confirm: string, url: string) => {
    const response = await axios.post(`${url}/signup/`, {
        username: username,
        email: email.toLowerCase(),
        password:  password,
        confirm: confirm
    },{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response
}

export const handleLogin =  async (email: string, password: string, url: string) => {
    const response = await axios.post(`${url}/login/`,{
        email: email,
        password : password
        }, {
            headers:{
                 "Content-Type": "application/json"
            }       
        }
    )
    return response
}

export const handleNewPassword = async (newPassword: string, apiUrl: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${apiUrl}/reset-password/confirm`, {
        password: newPassword,
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response;
}

export const sendEmailForReset = async(url: string, email:string) => {
    const response = await axios.post(`${url}/reset-password/email/`,{
        email: email
    }, {
        headers : {
            "Content-type": "application/json"
        }
    })
    return response
}

// This function parameter might be changed to any type
export const sendSurveyAnswers = async (data: object) => {
    const response = await axios.post(`${apiUrl2}/answers/`, data, 
    {
        headers : {
            "Content-type": "application/json"
        }
    })
    return response
}