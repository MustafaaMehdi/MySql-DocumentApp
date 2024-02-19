import checkLoginState from "./checkLoginState.js";

export default function logoutUser() {
    localStorage.clear();
    checkLoginState()
}