import _ from 'lodash';
import $ from './modules/elms.js';
import './index.css';
import QRCode from 'qrcode';

// TODO: Change this
const {div,textarea, canvas} = $;

function generateQRCode(text) {
    QRCode.toCanvas(qrc, text, function (error) {
        if (error) console.error(error)
        console.log('success!');
    });
}

function container(...rows) {
    return div({classes:['container']},...rows);
}

function row(...cols) {
    return div({classes:['row']},...cols);
}

function freeformInput(id,placeholder) {
    const ta = textarea({id});
    ta.setAttribute('placeholder', placeholder);
    return ta;
}

function qrcodeContainer(id) {
    return canvas({id});
}

const canvasId = 'canvas';
const qrc = qrcodeContainer(canvasId);

const textareaId = '';
const ta = freeformInput(textareaId,'enter text here');
ta.addEventListener('keyup',function() {
    const text = ta.value;
    generateQRCode(text);
});


document.body.appendChild(container(
    row(qrc),
    row(ta)
));

// init
generateQRCode('');
