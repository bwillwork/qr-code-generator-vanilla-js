import {filled, valid} from "../input";
import {ifElse, isActiveAndValid} from "../builders";
import {disableQRCodeControls, enableQRCodeControls} from "./qrcodeUI";
import {selectors, tabIdMap} from "../constants";
import generator from '../qrcodeGenerator';
import {isTabActive} from "../ui";

// Email feature
export function buildEmailGeneratorFunc(elmCache) {
    function emailIsValid(elmCache, emailSelectors) {

        const {to,subject,body} = emailSelectors;

        const toInput = elmCache.getElementFromSelector(to)[0];
        const subjectInput = elmCache.getElementFromSelector(subject)[0];
        const bodyInput = elmCache.getElementFromSelector(body)[0];

        const toValid = filled(toInput) && valid(toInput);
        const subjectValid = filled(subjectInput);
        const bodyValid = filled(bodyInput);
        return toValid && subjectValid && bodyValid;
    }
    const emailIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.email, isTabActive, emailIsValid);
    return ifElse(
        (elmCache,emailSelectors,tabId) => emailIsValidAndActiveFunc(tabId,emailSelectors),
        function(elmCache,emailSelectors) {
            enableQRCodeControls(elmCache);

            const {to,subject,body} = emailSelectors;

            const toInput = elmCache.getElementFromSelector(to)[0];
            const subjectInput = elmCache.getElementFromSelector(subject)[0];
            const bodyInput = elmCache.getElementFromSelector(body)[0];

            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];

            //Ex: mailto:test@test.com?subject=this%20is%20a%20subject&body=this%20is%20a%20body
            const subjectText = encodeURI(subjectInput.value);
            const bodyText = encodeURI(bodyInput.value);
            const link = `mailto:${toInput.value}?subject=${subjectText}&body=${bodyText}`;
            generator.generate(canvas, link);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
