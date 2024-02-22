import getUserProfile from "./getUserProfile.mjs";
import errorMsg from "../lib/errorMsg.mjs";
let mainContainer = document.getElementById('mainContainer');

export default function updatePassword(currentPasswordInput, newPasswordInput, newPasswordInput2, userProfileContainer) {
    let updatedName = {
        currentPassword: currentPasswordInput.value,
        newPassword: newPasswordInput.value
    }
    if (currentPasswordInput.value.trim() === '' || newPasswordInput.value.trim() === ''|| newPasswordInput2.value.trim() === '' ) {
        errorMsg(mainContainer, 'Please input current and new password') 
        return;
    }
    if (newPasswordInput.value !== newPasswordInput2.value) {
        errorMsg(mainContainer, 'New password does not match') 
        return;
    }
    fetch(`http://localhost:3000/api/users/editpass/${localStorage.getItem('loggedInUser')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedName)
    })
    .then((res) => {
        if (res.status === 401) {
            errorMsg(mainContainer, 'Current password is incorrect') 
            return;
        } else if (res.status === 500) {
            errorMsg(mainContainer, 'There was an error updating password') 
            return;
        }
        return res.json();
    })
    .then((user) => { 
        console.log(user);
    })
    getUserProfile()
    errorMsg(mainContainer, 'Password updated successfully!') 

}