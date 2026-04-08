// Import our custom CSS
import '../scss/styles.scss';
import DOM from './dom';

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

function init() {
    // Create popovers (bootstrap)
    const popovers = DOM.elms('[data-bs-toggle="popover"]');
    popovers.forEach(popover => (new Popover(popover)));


}



init();
