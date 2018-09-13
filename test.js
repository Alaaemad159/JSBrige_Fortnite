load('utils/helper.js');


function test () {
    let a = Uint8Array.from([1, 2, 3]);
    log('Uint8Array', hex(a));
}

function testChinese () {
    let address = malloc(1024);
    log('address:', hex(address));

    log('writeString:', writeString(address, '你好123你好'));
    log('readString:', readString(address));
}

function testMemory () {


    let test_sig = findPattern('\x49\x8B\x79\x10\x48\x8B\xC7\x48\x83\xE0\xFC\x45\x85\xC0\x0F\x85\x47\xE2\x08\x00', 'xxxxxxxxxxxxxxxxxxxx');
    log('test_sig', hex(test_sig));


    let address = malloc(1024);
    log('address:', hex(address));

    log('writeString:', writeString(address, 'ha'));
    log('readString:', readString(address));


    log('writeByte:', writeBytes(address, Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8])));
    log('readByte:', hex(readBytes(address, 8)));


    free(address);
}

function testMemory2 () {
    let address = VirtualAllocEx(-1, null, 1024, 0x1000, 0x40);


    log('VirtualAllocEx'.padEnd(16), hex(address));

    let result = VirtualFreeEx(-1, address, 1024, 0x00004000);
    log('VirtualFreeEx'.padEnd(16), result);
}

function testApi () {

    let buffer = malloc(260);
    invoke('kernel32.GetModuleFileNameA', null, buffer, 260);
    log('current:', readString(buffer));

    log(invoke('GetCurrentProcessId'));
    MessageBox(`[${invoke('GetCurrentProcessId').toString()}] ${readString(buffer)}`, 'CurrentProcess', 0x1000);
}


testApi();