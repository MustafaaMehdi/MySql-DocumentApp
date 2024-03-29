import errorMsg from "../lib/errorMsg.mjs";
import myDocuments from "./myDocuments.mjs";
let mainContainer = document.getElementById('mainContainer');


export default function updateDocument(updateBtn, documentBodyContent, documentTitle) {
   let docTitle = documentTitle.value
   let userID = localStorage.getItem('loggedInUser')

    let updateDoc = {
        title: docTitle,
        documentBody: documentBodyContent,
        userId: userID
    }
    if (!docTitle) {
        errorMsg(mainContainer, 'Please input title') 
        return;
    } 
 
    fetch(`http://localhost:3000/api/document/update/${updateBtn.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateDoc)
    })
    .then(res => res.json())
    .then((doc) => { 
        console.log(doc);
    })
    myDocuments()
}