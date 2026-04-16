import {filled, valid} from "../input";
import {ifElse, isActiveAndValid} from "../builders";
import {disableQRCodeControls, enableQRCodeControls} from "./qrcodeUI";
import {selectors, tabIdMap} from "../constants";
import generator from '../qrcodeGenerator';
import {isTabActive} from "../ui";

// Link feature

export function buildLinkGeneratorFunc(elmCache) {
    function linkIsValid(elmCache, linkSelector) {
        const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
        return filled(linkInput) && valid(linkInput)
    }
    const linkIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.link, isTabActive, linkIsValid);
    return ifElse(
        (elmCache,linkSelector,tabId) => linkIsValidAndActiveFunc(tabId,linkSelector),
        function(elmCache,linkSelector) {
            enableQRCodeControls(elmCache);
            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];
            const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
            generator.generate(canvas, linkInput.value);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
