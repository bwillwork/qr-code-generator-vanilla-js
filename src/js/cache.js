import _ from "lodash";
import DOM from "./dom";

export function buildElementCache(selectors) {

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

    //console.log('initData: ',initData,' | reverseSelectorKeyMap: ',reverseSelectorKeyMap, ' | cache: ', cache);

    // Public
    function get(key) {
        const selector = selectors[key];
        return cache[selector];
    }

    function update(elm,key) {
        const selector = selectors[key];
        cache[selector] = DOM.elms(selector);// Update cache
        return cache[selector];
    }

    function getSelector(key) {
        return selectors[key];
    }

    function getKeyFromSelector(selector) {
        return reverseSelectorKeyMap[selector];
    }

    function getElementFromSelector(selector) {
        const key = getKeyFromSelector(selector);
        return get(key);
    }

    return {
        get,
        update,
        getSelector,
        getKeyFromSelector,
        getElementFromSelector
    };

}
