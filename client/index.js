import render from './main-page-rendering.js';
import {subscribeToEvents, subscribers} from './event-subscriber.js';

document.addEventListener('DOMContentLoaded', async () => {
    let body = document.querySelector('body');
    let content = await render.renderMainPage();
    body.append(content);
    subscribeToEvents(subscribers.general);
});




