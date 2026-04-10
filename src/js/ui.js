
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


