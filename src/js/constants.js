
export const tabIdMap = {
    link: 'link-tab',
    text: 'text-tab',
    email: 'email-tab',
    textMessage: 'text-message-tab',
    wifi: 'wifi-tab',
};

export const tabKeys = Object.keys(tabIdMap);
export const tabIds = Object.values(tabIdMap);

export function selectorFromId(id) {
    return `#${id}`;
}

export const selectors = {
    /*
        --- Tabs ---
     */
    popovers: '[data-bs-toggle="popover"]',
    allTabs: 'button[data-bs-toggle="tab"]',
    linkTab: `#${tabIdMap.link}`,
    textTab: `#${tabIdMap.text}`,
    emailTab: `#${tabIdMap.email}`,
    textMessageTab: `#${tabIdMap.textMessage}`,
    wifiTab: `#${tabIdMap.wifi}`,

    /*
        --- Data Inputs ---
     */
    link: `#link-input`,
    text: `#text-input`,

    //mailto:test@test.com?subject=This%20is%20a%20subject&body=This%20is%20a%20body
    emailTo: `#email-to-input`,
    emailSubject: `#email-subject-input`,
    emailBody: `#email-body-input`,

    //sms:+19999999999?&amp;body=Hello%2520I%252C%2520have%2527a%2520question%25
    textMessagePhone: `#text-message-phone-input`,
    textMessageBody: `#text-message-body-input`,

    //WIFI:T:WPA;S:mynetwork;P:mypasscode;;
    wifiSSID: `#wifi-ssid-input`,
    wifiPassword: `#wifi-password-input`,

    /*
        --- QR Code Interface ---
     */
    canvas: `#qr-code-canvas`,
    noDataMessage: `#no-data-message`,
    downloadBtn: `#download-btn`,

};