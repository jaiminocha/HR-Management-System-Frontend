// isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data == null) {
        return false;
    }
    else {
        return true; 
    }
}

// doLogin, data set ot local storage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next();
}

// doLogout, remove from local storage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

// get current user 
export const getCurrentUserDetail = () => {
    if (isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).employeeDto;
    }
    else return undefined;
}

// get token
export const getToken = () => {
    if (isLoggedIn()){
        return  JSON.parse(localStorage.getItem("data")).token
    }
    return undefined;
}