import axios from 'axios';

export const sendPrompt = async(url:string, input: string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${url}/prompt/`,{
        input: input
    }, {
        headers : {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    return response
}

export const logOut  = async(url:string) => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(`${url}/logout/`,{}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    return response
}

export const sendEmailOtp = async(email :string, url:string) =>  {
    const response = await axios.post(`${url}/email-otp/`, {
        email:email,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const registerUser = async(otpCode :string,url:string) => {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const response = await axios.post(`${url}/register/`,{
        email:email,
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

export const handleSignUp  = async(username:string, email:string, password:string, confirm:string, url:string) => {
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

export const handleLogin =  async(email:string , password: string, url: string) => {
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

// Implement the handle new password here, connect the new password back end functionality here
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