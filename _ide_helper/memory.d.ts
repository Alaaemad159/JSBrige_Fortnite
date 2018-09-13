/**
 * malloc and zero
 * @param {Number | String} size
 * @returns {Number}
 */
declare function malloc(size: Number | String): Number;

/**
 * free
 * @param {Number | String} address
 * @returns {Number}
 */
declare function free(address: Number | String): void;

/**
 * 搜索内存，默认只搜索当前进程主模块
 * @param {String} pattern      BYTE
 * @param {String} mask         模糊位: ?
 * @returns {Number | Boolean} 出错返回FALSE 没找到返回-1
 */
declare function findPattern(pattern: String, mask: String): Number | Boolean;

/**
 * 搜索内存
 * @param {Number} start        起始位置
 * @param {Number} size         搜索长度
 * @param {String} pattern      BYTE
 * @param {String} mask         模糊位: ?
 * @returns {Number | Boolean} 出错返回FALSE 没找到返回-1
 */
declare function findPattern(start: Number | String, size: Number | String, pattern: String, mask: String): Number;

/**
 * 读取BYTE
 * ## 返回值范围：
 * 0 ~ 255
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readByte(address: Number | String): Number;

/**
 * 写入BYTE
 * ## 写入数值范围：
 * 0 ~ 255
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeByte(address: Number | String, value: Number): Boolean;

/**
 * 读取有符号16位整数
 * ## 返回值范围：
 * -32768  ~ 32767
 * -0x8000 ~ 0x7FFF
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readShort(address: Number | String): Number;

/**
 * 写入有符号16位整数
 * ## 写入数值范围：
 * -32768  ~ 32767
 * -0x8000 ~ 0x7FFF
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeShort(address: Number | String, value: Number): Boolean;

/**
 * 读取有符号32位整数
 * ## 返回值范围：
 * -2147483648 ~ 2147483647
 * -0x80000000 ~ 0x7FFFFFFF
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readInt(address: Number | String): Number;

/**
 * 写入有符号32位整数
 * ## 写入数值范围：
 * -2147483648 ~ 2147483647
 * -0x80000000 ~ 0x7FFFFFFF
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeInt(address: Number | String, value: Number): Boolean;

/**
 * 读取无符号32位整数
 * ## 返回值范围：
 * 0 ~ 4294967295
 * 0 ~ 0xFFFFFFFF
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readUInt(address: Number | String): Number;

declare const readDWord = readUInt;

/**
 * 写入无符号32位整数
 * ## 写入数值范围：
 * 0 ~ 4294967295
 * 0 ~ 0xFFFFFFFF
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeUInt(address: Number | String, value: Number): Boolean;

declare const writeDWord = writeUInt;

/**
 * 读取有符号64位整数
 * ## 返回值范围：
 * -9223372036854775808 ~ 9223372036854775807
 * -0x8000000000000000  ~ 0x7FFFFFFFFFFFFFFF
 * ## 返回值类型：
 * -0x1FFFFFFFFFFFFF ~ 0x1FFFFFFFFFFFFF 为 Number
 * 超出 为 BigInt
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readInt64(address: Number | String): Number | BigInt;

/**
 * 写入有符号64位整数
 * ## 写入数值范围：
 * -0x1FFFFFFFFFFFFF ~ 0x1FFFFFFFFFFFFF
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeInt64(address: Number | String, value: Number): Boolean;

/**
 * 读取无符号64位整数
 * ## 返回值范围：
 * 0 ~ 18446744073709551615
 * 0 ~ 0xFFFFFFFFFFFFFFFF
 * ## 返回值类型：
 * 0 ~ 0x1FFFFFFFFFFFFF 为 Number
 * 超出 为 BigInt
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readUInt64(address: Number | String): Number | BigInt;

declare const readQWord = readUInt64;

/**
 * 写入无符号64位整数
 * ## 写入数值范围：
 * 0 ~ 0x1FFFFFFFFFFFFF
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeUInt64(address: Number | String, value: Number): Boolean;

declare const writeQWord = writeUInt64;

/**
 * 读取无符号指针
 * 32位系统下为readDWord
 * 64位系统下为readQWord
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readPointer(address: Number | String): Number;

/**
 * 写入无符号指针
 * 32位系统下为writeDWord
 * 64位系统下为writeQWord
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writePointer(address: Number | String, value: Number): Boolean;

/**
 * 读取浮点数
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readFloat(address: Number | String): Number;

/**
 * 写入浮点数
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeFloat(address: Number | String, value: Number): Boolean;

/**
 * 读取双精度浮点数
 * @param {Number | String} address
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readDouble(address: Number | String): Number;

/**
 * 写入双精度浮点数
 * @param {Number | String} address
 * @param {Number} value
 * @returns {Boolean}
 */
declare function writeDouble(address: Number | String, value: Number): Boolean;

/**
 * 读取BYTE
 * @param {Number | String} address
 * @param {Number | String} size 读取长度
 * @returns {Uint8Array | Boolean} 返回 FALSE 失败
 */
declare function readBytes(address: Number | String, size: Number | String): Uint8Array;

/**
 *
 * @param {Number | String} address
 * @param {ArrayBuffer} value
 * @returns {Boolean}
 */
declare function writeBytes(address: Number | String, value: Uint8Array): Boolean;

/**
 * 读取字符串，最大长度1024
 * @param {Number | String} address
 * @param {Number | String} length 为空则取到 '\0' 为止
 * @returns {String | Boolean} 返回 FALSE 失败
 */
declare function readString(address: Number | String, length: Number | String = null): String;

/**
 * 写入字符串
 * @param {Number | String} address
 * @param {String} value
 * @returns {Boolean}
 */
declare function writeString(address: Number | String, value: String): Boolean;

/**
 * 读取宽字符字符串，最大长度1024，内部会自动转换为char输出
 * @param {Number | String} address
 * @param {Number | String} length 为空则取到 '\0' 为止
 * @returns {Number | Boolean} 返回 FALSE 失败
 */
declare function readStringW(address: Number | String, length: Number | String = null): Number;

/**
 * 写入宽字符字符串，内部会自动转换为wchar_t写入内存
 * @param {Number | String} address
 * @param {String} value
 * @returns {Boolean}
 */
declare function writeStringW(address: Number | String, value: String): Boolean;



