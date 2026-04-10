// Import our custom CSS
import '../scss/styles.scss';
import DOM from './dom';
import _ from 'lodash';
import generator from './qrcodeGenerator';

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';
import tab from "bootstrap/js/src/tab";
import {disableQRCodeControls, enableQRCodeControls} from "./ui";
import {filled, valid} from "./input";
import {buildElementCache} from "./cache";
import {tabIdMap, selectors, selectorFromId} from "./constants";

(function init() {

    function isTabActive(elmCache,id) {
        const tabs = elmCache.getElementFromSelector(selectors.allTabs);
        const activeTab = tabs.find(t => t.classList.contains('active'));
        return _.isEqual(activeTab.id, id);
    }

    function generateLinkQRCode(elmCache) {
        const isActive = isTabActive(elmCache,tabIdMap.link);
        const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
        const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
        const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
        if(isActive) {
            if(filled(linkInput) && valid(linkInput)) {
                enableQRCodeControls({downloadBtn,noDataMessage,canvas});
                generator.generate(canvas, linkInput.value);
            } else {
                disableQRCodeControls({downloadBtn,noDataMessage,canvas});
            }
        }
    }


    const elmCache = buildElementCache(selectors);

    // Create popovers (bootstrap)
    const popovers = elmCache.getElementFromSelector(selectors.popovers);
    console.log(popovers);
    popovers.forEach(popover => (new Popover(popover)));

    // Init Tab Cache
    const tabEls = elmCache.getElementFromSelector(selectors.allTabs);
    tabEls.forEach(elm => {
        elm.addEventListener('shown.bs.tab', event => {
            const activeId = event.target.getAttribute('id');
            const previousId = event.relatedTarget.getAttribute('id');

        })
    });


    const linkInput = elmCache.getElementFromSelector(selectors.link)[0];//DOM.elm(`#link-input`);
    generateLinkQRCode(elmCache);
    linkInput.addEventListener('keyup', () => generateLinkQRCode(elmCache));


})();
