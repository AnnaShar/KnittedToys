import links from "../config-files/links.js";
import generator from './html-creator.js';

const generateErrorMessage = (message) => {
    let errorWrap = generator.createDiv(['error-wrap']);
    let errorImg = generator.createDiv(['error-img']);

    let img = generator.createImg(links.sadToyImage);

    errorImg.append(img);

    let errorMessage = generator.createDiv(['error-message'], message);

    errorWrap.append(errorImg);
    errorWrap.append(errorMessage);

    return errorWrap;
};

export default {
    generateErrorMessage: generateErrorMessage
}