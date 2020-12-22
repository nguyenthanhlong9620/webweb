const login = (userId) => {
    localStorage.setItem("id", userId);
}

const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("profileId");
    window.location.replace("/");
}

const checkLogin = () => {
    return localStorage.getItem("id");
}

// const checkLogin = (component, path) => {
//     if(routingLogin.includes(path)) {
//         const id = localStorage.getItem("id");
//         if(id) { 
//             window.location.replace("/user/"+id);
//         } else { 
//             window.location.replace("/login");
//         }
//     } 
//     return component;
// }

export default {
    login,
    logout,
    checkLogin
};