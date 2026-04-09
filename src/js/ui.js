
export function show(elm) {
    elm.classList.remove('d-none');
}

export function hide(elm) {
    elm.classList.add('d-none');
}

export function disable(elm) {
    elm.classList.add('disabled');
}

export function enable(elm) {
    elm.classList.remove('disabled');
}

export function enableQRCodeControls({downloadBtn,noDataMessage,canvas}) {
    enable(downloadBtn);
    hide(noDataMessage);
    show(canvas);
}

export function disableQRCodeControls({downloadBtn,noDataMessage,canvas}) {
    disable(downloadBtn);
    show(noDataMessage);
    hide(canvas);
}

