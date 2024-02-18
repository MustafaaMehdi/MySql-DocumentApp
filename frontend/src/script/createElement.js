export default function createElementWithText(tagName, id, className, text) {
	const element = document.createElement(tagName);
	element.id = id;
	element.className = className;
	element.innerText = text;
	return element;
}