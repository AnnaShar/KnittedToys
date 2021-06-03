import generator from './html-creator.js';

const generateTable = (columns, items) => {
    let table = generator.createDiv(['table', 'toys-table']);

    let caption = generateCaption(columns);
    table.append(caption);

    items.forEach(item => {
        let contentRow = generateContentRow(item, columns);
        table.append(contentRow);
    });
    return table;
};

const generateCaption = (columns) => {
    const columnIDs = Object.keys(columns);
    return generateRow(columnIDs, columns, 'caption');
};

const generateContentRow = (item, columns) => {
    const columnIDs = Object.keys(columns);
    let row = generateRow(columnIDs, item, 'content');
    row.setAttribute('data-row-id', item.id);

    let buttonWrap = row.querySelectorAll('.table__button-wrap');
    let editButton = generateEditButton();
    buttonWrap[0].append(editButton);

    let deleteButton = generateDeleteButton();
    buttonWrap[1].append(deleteButton);

    return row;
};

const generateRow = (columnIDs, values, type) => {
    let row = generator.createDiv(['table__row', `row-${type}`]);

    columnIDs.forEach(column => {
        let cell = generateCell(column, values[column], type);
        row.append(cell);
    });

    for (let i = 0; i < 2; i++) {
        let btnCell = generateButtonCell();
        row.append(btnCell);
    }

    return row;
};

const generateCell = (column, value, type) => {
    let cell = generator.createDiv(['table__cell', `cell-${type}`], value.toString());
    cell.setAttribute('data-column', column);
    return cell;
};

const generateButtonCell = () => {
    let btnCell = generator.createDiv(['table__button-wrap']);
    return btnCell;
};

// const generateDeleteButton = () => {
//     let button = document.createElement('object');
//     button.classList.add('table__button');
//     button.type = 'image/svg+xml';
//     button.data = 'delete-forever.svg';
//
//     let span = document.createElement('span');
//     span.innerText = 'Delete';
//     button.append(span);
//
//     return button;
// };

const generateDeleteButton = () => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    iconPath.setAttribute(
        'd',
        'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z'
    );

    iconSvg.setAttribute('fill', '#A92621');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('width', '30');
    iconSvg.setAttribute('height', '30');
    iconSvg.classList.add('delete-button');

    iconSvg.append(iconPath);

    return iconSvg;
};

const generateEditButton = () => {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    iconPath.setAttribute(
        'd',
        'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'
    );

    iconSvg.setAttribute('fill', 'green');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('width', '28');
    iconSvg.setAttribute('height', '28');
    iconSvg.classList.add('edit-button');

    iconSvg.append(iconPath);

    return iconSvg;
};

export default {
    generateTable: generateTable
}