import DOM from "../dom";
import {allSelectors, tabIdMap} from "../constants";

function buildCache(selectors) {

    // Init
    const initData = {
        keys: Object.keys(selectors),
        values: Object.values(selectors),
        selectors
    };
    const reverseSelectorKeyMap = {};
    for(let key of initData.keys) {
        const value = selectors[key];
        reverseSelectorKeyMap[value] = key;
    }

    const cache = {};
    for(let selector of initData.values) {
        cache[selector] = DOM.elms(selector);
    }

    function get(key) {
        const selector = selectors[key];
        return cache[selector];
    }

    function getKeyFromSelector(selector) {
        return reverseSelectorKeyMap[selector];
    }

    // Public

    function getElementFromSelector(selector) {
        const key = getKeyFromSelector(selector);
        return get(key);
    }

    return {
        getElementFromSelector
    };

}

const elmCache = buildCache(allSelectors);
export default elmCache;