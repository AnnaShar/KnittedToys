const createDiv = (classList = [], text) => {
    let div = document.createElement('div');
    classList.forEach((className) => div.classList.add(className));
    if (text) {
        div.innerText = text;
    }
    return div;
};

const createImg = (src, alt) => {
    let img = document.createElement('img');
    img.src = src;
    if (alt) {
        img.alt = alt;
    }

    return img;
};

const createHeader = (headerType, headerText, classList = []) => {
    let header = document.createElement(headerType);
    classList.forEach((className) => header.classList.add(className));
    header.innerText = headerText;
    return header;
};

const createSpan = (classList = [], innerHTML) => {
    let span = document.createElement('span');
    classList.forEach((className) => span.classList.add(className));
    span.innerHTML = innerHTML;
    return span;
};

const createTextArea = (classList = [], innerHTML) => {
    let textarea = document.createElement('textarea');
    classList.forEach((className) => textarea.classList.add(className));
    textarea.innerHTML = innerHTML;
    return textarea;
};


export default {
    createDiv,
    createImg,
    createHeader,
    createSpan,
    createTextArea
}