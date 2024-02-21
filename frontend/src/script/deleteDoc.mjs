import myDocuments from "./myDocuments.js";

export default function deleteDoc(deleteDocBtn) {
       // let docId = editDocBtn.id
       let deleteDoc = {
        userId: localStorage.getItem('loggedInUser')
         };
        console.log(deleteDoc);
    fetch(`http://localhost:3000/api/document/delete/${deleteDocBtn.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteDoc)
    })
    .then(res => res.json())
    .then((doc) => {
        console.log(doc);
        myDocuments()
    })
}