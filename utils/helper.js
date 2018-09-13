console = {
    debug: log,
    error: logError,
    info: log,
    log: log,
    warn: logError,
};


function hex (number) {
    if (number === null || number === undefined)
        return number;
    if (number.constructor === Array || number.constructor === Uint8Array || number.constructor === Uint16Array || number.constructor === Uint32Array) {
        let arr = Array.from(number).map(e => '0x' + parseInt(e).toString(16).toUpperCase());
        return ('[' + arr.join(', ') + ']');
    } else {
        return '0x' + parseInt(number).toString(16).toUpperCase()
    }
}

const g_is64 = is64();

const sizeof = {
    int: 4,
    long: 4,
    float: 4,
    double: 4,
    DWORD: 4,
    QWORD: 8,
    DWORD_PTR: g_is64 ? 8 : 4,
    HWND: g_is64 ? 8 : 4,
    pad_2: 2,
    pad_4: 4,
};

const VK = {
    END: 0x23,
    HOME: 0x24,
    LEFT: 0x25,
    UP: 0x26,
    RIGHT: 0x27,
    DOWN: 0x28,
    LBUTTON: 0x01,
    RBUTTON: 0x02,
    SHIFT: 0x10,
    CONTROL: 0x11,
};