import {filled, valid} from "../util/inputUtil";
import {ifElse, isActiveAndValid} from "../util/buildersUtil";
import {disableQRCodeControls, enableQRCodeControls} from "../ui/qrcodeUI";
import {allSelectors, tabIdMap} from "../constants";
import generator from '../qrcode/generate';
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
            const canvas = elmCache.getElementFromSelector(allSelectors.canvas)[0];
            const linkInput = elmCache.getElementFromSelector(linkSelector)[0];
            generator.generate(canvas, linkInput.value);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
