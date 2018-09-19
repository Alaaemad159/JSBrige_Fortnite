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

function testWorld () {
  this._cameracache_pov = malloc(500);

  writeFloat(this._cameracache_pov, 58346.8984375);
  writeFloat(this._cameracache_pov + 4, 28209.8183);
  writeFloat(this._cameracache_pov + 8, 2852.6911);

  writeFloat(this._cameracache_pov + 0xC, -4.6486);
  writeFloat(this._cameracache_pov + 0x10, 175.479675);
  writeFloat(this._cameracache_pov + 0x14, 0);

  writeFloat(this._cameracache_pov + 0x18, 80);


  let result = WorldToScreen({
    x: 39257.8828125,
    y: 46486.81640625,
    z: 3431.288330078125
  }, this._cameracache_pov, { x: 960, y: 600 });

  log(result.x, result.y)
}


function testRotation () {
  this._cameracache_pov = malloc(500);

  writeFloat(this._cameracache_pov, 58346.8984375);
  writeFloat(this._cameracache_pov + 4, 28209.8183);
  writeFloat(this._cameracache_pov + 8, 2852.6911);

  writeFloat(this._cameracache_pov + 0xC, -4.6486);
  writeFloat(this._cameracache_pov + 0x10, 175.479675);
  writeFloat(this._cameracache_pov + 0x14, 0);

  writeFloat(this._cameracache_pov + 0x18, 80);

  const _aim_rotation = malloc(0xC);
  const nowRotation = malloc(0xC);

  CalcControlRotation({ x: 100, y: 100, z: 100 },
    this._cameracache_pov, nowRotation, _aim_rotation);

  log(hex(readFloat(_aim_rotation)));
  log(hex(readFloat(_aim_rotation + 4)))
}


function testChangeThreadId () {
  log('before', invoke('GetCurrentThreadId'));
  ChangeCurrentThreadId(1234);
  log('after ', invoke('GetCurrentThreadId'));
}

testApi();
