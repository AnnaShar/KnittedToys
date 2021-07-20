import generator from './html-helpers.js';

const generateModalWindow = (header, items, mode) => {
    let modalWindow = generator.createDiv(['toy-update-modal', 'modal', mode]);
    let content = generator.createDiv(['modal__content']);

    content.append(generateModalHeader(header));
    content.append(generateModalBody(items, mode));
    content.append(generateModalFooter(mode));

    modalWindow.append(content);
    return modalWindow;
};

const generateModalHeader = (headerText) => {
    let header = generator.createDiv(['modal__header']);
    const headerTextWrap = generator.createDiv(['modal__header--text'], headerText);
    const closeBtn = generator.createSpan(['modal__close-button'], '&times');

    header.append(headerTextWrap);
    header.append(closeBtn);

    return header;
};

const generateModalBody = (items, mode) => {
    let body = generator.createDiv(['modal__body']);
    items.forEach(item => {
        body.append(generateModalRow(item, mode));
    });

    return body;
};

const generateModalRow = (item, mode) => {
    let row = generator.createDiv(['modal__details', 'details-row']);
    const key = generator.createDiv(['details-row__key'], item[0]);

    let value;

    switch (mode) {
        case 'show':
            value = generator.createDiv(['details-row__value'], item[1]);
            break;
        case 'update':
            if(item[0].toLowerCase().toLowerCase()==='id'){
                value = generator.createDiv(['details-row__value'], item[1]);
                value.style.border='none';
            }
            else {
                value = generator.createTextArea(['details-row__value'], item[1]);
            }
            break;
    }

    row.append(key);
    row.append(value);

    return row;
};

const generateModalFooter = (mode) => {
    let footer = generator.createDiv(['modal__footer']);
    if (mode === 'update') {
        const submitBtn = generator.createDiv(['modal__submit-button'], 'Submit');

        footer.append(submitBtn);
    }

    return footer;
};


export default {
    generateModalWindow
}