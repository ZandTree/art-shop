import axios from '@/api/axios'



const register = (creds)=>{
    return axios.post('/auth/users/',creds)
}
const activate = (creds)=>{
    return axios.post('/auth/users/activation/',creds)
}
const login = (creds)=>{
    return axios.post('/auth/jwt/create/',creds)
}
const getUser = (accessToken)=>{
    axios.defaults.headers.common["Authorization"] = `JWT ${accessToken}`
    return axios.get('/auth/users/me/')
}


export default {
    register,
    activate,
    login,
    getUser

}    
