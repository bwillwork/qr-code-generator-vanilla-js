// Import our custom CSS
import '../scss/styles.scss';

import {allSelectors, tabIdMap, inputSelectors} from "./constants";
import generator from './qrcode/generate';
import DOM from "./dom";
import {disable, enable} from "./ui";


import domCache from "./cache/domCache";
//import appCache from "./cache/appCache";
import {getGeneratorMap} from "./util/featureGeneratorUtil";
import * as tabs from "./ui/tabsUI";



(function init() {

    function ensureArray(elms) {
        return Array.isArray(elms) ? elms : [elms];
    }

    function bindInputs(selectors,handler) {
        const selectorList = ensureArray(selectors);

        selectorList.forEach(selector => {
            const element = domCache.getFromSelector(selector)[0];
            if (element) element.addEventListener('input', handler);
        });
    }


    const generatorMap = getGeneratorMap();
    tabs.initTabs();

    // Init Link Event Hooks
    generatorMap.link(domCache, allSelectors.link, tabIdMap.link);// Needed for the first page
    bindInputs([allSelectors.link],() => generatorMap.link(domCache, allSelectors.link, tabIdMap.link));

    // Init Text Event Hooks
    bindInputs([allSelectors.text],() => generatorMap.text(domCache, allSelectors.text, tabIdMap.text));

    // Init Email Event Hooks
    const emailSelectors = Object.values(inputSelectors.email);
    bindInputs(emailSelectors,() => generatorMap.email(domCache, inputSelectors.email, tabIdMap.email));

    // Text Message Event Hooks
    const smsSelectors = Object.values(inputSelectors.sms);
    bindInputs(smsSelectors,() => generatorMap.sms(domCache, inputSelectors.sms, tabIdMap.textMessage));

    // Wifi Event Hooks
    const wifiSelectors = Object.values(inputSelectors.wifi);
    bindInputs(wifiSelectors,() => generatorMap.wifi(domCache, inputSelectors.wifi, tabIdMap.wifi));

    // Download Button
    const downloadBtn = domCache.getFromSelector(allSelectors.downloadBtn)[0];
    downloadBtn.addEventListener('click',function() {
        disable(downloadBtn);
        generator.produceImageUrl(
            url => DOM.createDownloadAnchor(url,'qrcode').click()
        ,() => enable(downloadBtn));
    });

})();
