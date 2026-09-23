import {buildLinkGeneratorFunc} from "../features/link";
import domCache from "../cache/domCache";
import {buildTextGeneratorFunc} from "../features/text";
import {buildEmailGeneratorFunc} from "../features/email";
import {buildTextMessageGeneratorFunc} from "../features/textMessage";
import {buildWifiGeneratorFunc} from "../features/wifi";


const link = buildLinkGeneratorFunc(domCache);
const text = buildTextGeneratorFunc(domCache);
const email = buildEmailGeneratorFunc(domCache);
const sms = buildTextMessageGeneratorFunc(domCache);
const wifi = buildWifiGeneratorFunc(domCache);

export function getGeneratorMap() {
    return {
        link,
        text,
        email,
        sms,
        wifi
    };
}
