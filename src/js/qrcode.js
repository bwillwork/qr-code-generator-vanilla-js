import QRCode from 'qrcode';

function _error(e) {
    if (error) console.error(error)
    console.log('success!');
}

function generate(canvas, text) {
    QRCode.toCanvas(canvas, text, _error);
}

function produceImage(text) {
    QRCode.toDataURL(text,)
}

export default {
    generate,
    produceImage
};