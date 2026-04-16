import {selectors} from "../constants";
import {disable, enable, hide, show} from "../ui";

export function enableQRCodeControls(elmCache) {
    const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
    const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
    const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
    enable(downloadBtn);
    hide(noDataMessage);
    show(canvas);
}

export function disableQRCodeControls(elmCache) {
    const downloadBtn = elmCache.getElementFromSelector(selectors.downloadBtn)[0];
    const noDataMessage = elmCache.getElementFromSelector(selectors.noDataMessage)[0];
    const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
    disable(downloadBtn);
    show(noDataMessage);
    hide(canvas);
}