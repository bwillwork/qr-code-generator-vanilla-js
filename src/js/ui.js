import {selectors} from "./constants";
import _ from "lodash";

export function show(elm) {
    elm.classList.remove('d-none');
}

export function hide(elm) {
    elm.classList.add('d-none');
}

export function disable(elm) {
    elm.classList.add('disabled');
}

export function enable(elm) {
    elm.classList.remove('disabled');
}

export function isTabActive(elmCache,id) {
    const tabs = elmCache.getElementFromSelector(selectors.allTabs);
    const activeTab = tabs.find(t => t.classList.contains('active'));
    return _.isEqual(activeTab.id, id);
}


