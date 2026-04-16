import {filled, valid} from "../input";
import {ifElse, isActiveAndValid} from "../builders";
import {disableQRCodeControls, enableQRCodeControls} from "./qrcodeUI";
import {selectors, tabIdMap} from "../constants";
import generator from '../qrcodeGenerator';
import {isTabActive} from "../ui";

// Text Message feature
export function buildTextMessageGeneratorFunc(elmCache) {
    function textMessageIsValid(elmCache, textMessageSelectors) {

        const {phoneNumbers,message} = textMessageSelectors;

        const phoneNumbersInput = elmCache.getElementFromSelector(phoneNumbers)[0];
        const messageInput = elmCache.getElementFromSelector(message)[0];

        const phoneNumbersValid = filled(phoneNumbersInput) && valid(phoneNumbersInput);
        const messageValid = filled(messageInput);
        return phoneNumbersValid && messageValid;
    }
    const textMessageIsValidAndActiveFunc = isActiveAndValid(elmCache, tabIdMap.textMessage, isTabActive, textMessageIsValid);
    return ifElse(
        (elmCache,textMessageSelectors,tabId) => textMessageIsValidAndActiveFunc(tabId,textMessageSelectors),
        function(elmCache,textMessageSelectors) {
            enableQRCodeControls(elmCache);

            const {phoneNumbers,message} = textMessageSelectors;

            const phoneNumbersInput = elmCache.getElementFromSelector(phoneNumbers)[0];
            const messageInput = elmCache.getElementFromSelector(message)[0];

            const canvas = elmCache.getElementFromSelector(selectors.canvas)[0];

            //Ex: sms:<phone_number>?body=<message_text>
            const messageText = encodeURI(messageInput.value);
            const link = `mailto:${phoneNumbersInput.value}?body=${messageText}`;
            generator.generate(canvas, link);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
