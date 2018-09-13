// log(readFloat(0x26eaa120604));

load('utils/helper.js');
log(hex(GetModuleBase()));

log('msg', invoke('user32.MessageBoxA', 0, 'aaaaaa一二三bbbbb', '123', 0x20 + 1 + 0x1000));


/*
const blood_address = readPointer(readPointer(readPointer(getModuleBase() + 0x0609B4D0) + 0x28) + 0x78) + 0xFC;

let blood = readInt(blood_address);



log('blood:', blood);


while(1){
    writeInt(blood_address,200000);
    sleep(1);
}*/
