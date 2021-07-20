import pageRenderer from './main-page-renderer.js';
import serverRequests from './server-requests.js';
import {subscribeToEvents, subscribers} from './event-subscriber.js';


const init = async () => {
    let toys;
    try {
        toys = await serverRequests.getAllToys();
        pageRenderer.renderContentPage(toys);
        subscribeToEvents(subscribers.general);
    } catch (e) {
        pageRenderer.renderErrorPage(e);
    }
};

export default {
    init
}