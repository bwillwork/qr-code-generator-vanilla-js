import {filled, valid} from "../util/inputUtil";
import {ifElse, isActiveAndValid} from "../util/buildersUtil";
import {disableQRCodeControls, enableQRCodeControls} from "../ui/qrcodeUI";
import {allSelectors, tabIdMap} from "../constants";
import generator from '../qrcode/generate';
import {isTabActive} from "../ui";

// Text Message feature
export function buildTextMessageGeneratorFunc(elmCache) {
    function textMessageIsValid(elmCache, textMessageSelectors) {

        const {phoneNumbers,message} = textMessageSelectors;

        const phoneNumbersInput = elmCache.getFromSelector(phoneNumbers)[0];
        const messageInput = elmCache.getFromSelector(message)[0];

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

            const phoneNumbersInput = elmCache.getFromSelector(phoneNumbers)[0];
            const messageInput = elmCache.getFromSelector(message)[0];

            const canvas = elmCache.getFromSelector(allSelectors.canvas)[0];

            //Ex: sms:<phone_number>?body=<message_text>
            const messageText = encodeURI(messageInput.value);
            const link = `sms:${phoneNumbersInput.value}?body=${messageText}`;
            generator.generate(canvas, link);
        },
        function(elmCache) {
            disableQRCodeControls(elmCache);
        });
}
