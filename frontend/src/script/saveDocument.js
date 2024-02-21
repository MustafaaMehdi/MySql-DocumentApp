export default function saveDocument(documentBodyContent, documentTitle) {
    let sendDoc = {
            
			userId: localStorage.getItem('loggedInUser'),
			title: documentTitle.value,
            documentBody: documentBodyContent
        		};
            console.log(sendDoc);
		fetch('http://localhost:3000/api/document/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendDoc)
		})
        .then(res => res.json())
        .then(data => console.log(data))
}