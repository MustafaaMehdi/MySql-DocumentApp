import getUserProfile from "./getUserProfile.mjs";
import errorMsg from "../lib/errorMsg.mjs";

export default function updateProfile(nameInput) {
    let updatedName = {
        userName: nameInput.value
    }
    fetch(`http://localhost:3000/api/users/updateprofile/${localStorage.getItem('loggedInUser')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedName)
    })
    .then(res => res.json())
    .then((user) => { 
        console.log(user);
    })
    getUserProfile()
    errorMsg(mainContainer, 'Name updated successfully!') 

}