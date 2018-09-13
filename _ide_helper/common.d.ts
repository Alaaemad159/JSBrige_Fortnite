/**
 * V8 Version
 */
declare function version(): String;

/**
 * Is x64 build
 */
declare function is64(): Boolean;

/**
 * Test
 */
declare function test(...any: any[]): any;

/**
 * 打印日志
 * @param str
 */
declare function log(...str: any[]): void;

declare var print = log;

/**
 * 打印错误
 * @param str
 */
declare function logError(...str: any[]): void;

/**
 * 引入JS脚本
 * @param {String} script
 * @returns {String}
 */
declare function load(script: String): String;

/**
 * 结束当前脚本
 */
declare function exit(): void;

/**
 * Hex
 * @param {Number | String} number
 * @returns {String}
 */
// declare function hex(number: Number | String): String;
