
export function valid(elm) {
    let isValid = false;
    if(elm.matches(':valid')) isValid = true;
    if(elm.matches(':invalid')) isValid = false;
    return isValid;
}

export function filled(elm) {
    let isFilled = false;
    if(elm.value) isFilled = true;
    return isFilled
}

