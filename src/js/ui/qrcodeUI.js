import {allSelectors} from "../constants";
import {disable, enable, hide, show} from "../ui";

export function enableQRCodeControls(elmCache) {
    const downloadBtn = elmCache.getElementFromSelector(allSelectors.downloadBtn)[0];
    const noDataMessage = elmCache.getElementFromSelector(allSelectors.noDataMessage)[0];
    const canvas = elmCache.getElementFromSelector(allSelectors.canvas)[0];
    enable(downloadBtn);
    hide(noDataMessage);
    show(canvas);
}

export function disableQRCodeControls(elmCache) {
    const downloadBtn = elmCache.getElementFromSelector(allSelectors.downloadBtn)[0];
    const noDataMessage = elmCache.getElementFromSelector(allSelectors.noDataMessage)[0];
    const canvas = elmCache.getElementFromSelector(allSelectors.canvas)[0];
    disable(downloadBtn);
    show(noDataMessage);
    hide(canvas);
}