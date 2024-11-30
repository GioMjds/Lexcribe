import axios from 'axios';


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