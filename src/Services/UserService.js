import { getToken } from "../Auth";
import { myAxios } from "./Helper";

// log in
export const logIn = async(user) => {
    console.log(user)
    return myAxios.post('/api/v1/auth/login', user).then((response) => response.data);
}

// get all users
export const loadAllUsers = async() => {
    const token = JSON.parse(localStorage.getItem("data")).token;
    // console.log(token)
    return myAxios.get(`api/employees/`, {
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}

// update self
export const updateSelf = async(empInfo, empId) => {
    // const token = JSON.parse(localStorage.getItem("data")).token;
    const token = getToken();
    return await myAxios.put(`api/employees/employee/${empId}`, empInfo,{
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}

// delete user
export const deleteEmp = async(empId) => {
    const token = getToken();
    return await myAxios.delete(`api/employees/${empId}`,
    {
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}

// get all roles
export const loadAllRoles = async() => {
    const token = getToken();
    return myAxios.get(`api/roles/`, {
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}

// create user
export const createUser = async(empInfo) => {
    const token = getToken();
    return myAxios.post(`api/employees/`, empInfo, {
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}

// update anyone
export const updateUser = async(empInfo, empId) => {
    const token = getToken();
    return myAxios.put(`api/employees/${empId}`, empInfo, {
        headers: {
            'Authorization': `Bearer ${token}` //the token is a variable which holds the token
        }
    }).then((response) => response.data);
}