export default function applyCssans() {
    let elements = document.getElementsByClassName('cssans');
    for(let element of elements){
        CSSans(element, element.innerText);
    }
}