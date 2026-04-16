import QRCode from 'qrcode';


let lastGeneratedText = ''

function _error(e) {
    if (e) console.error(e)
}

function generate(canvas, text) {
    lastGeneratedText = text;
    QRCode.toCanvas(canvas, text, _error);
}

function produceImageUrl(callbackFunc,finallyFunc) {
    console.log('generate: ',lastGeneratedText);
    return QRCode.toDataURL(lastGeneratedText, { errorCorrectionLevel: 'H' })
        .then(callbackFunc)
        .catch(_error)
        .finally(finallyFunc);
}

export default {
    generate,
    produceImageUrl
};