/**
 *
 * @param {{x: Number, y: Number, z: Number}} world
 * @param {Number} POV
 * @param {{x: Number, y: Number}} screenCenter
 * @returns {{x: Number, y: Number}}
 * @constructor
 */
declare function WorldToScreen(world: { x: Number, y: Number, z: Number }, POV: Number, screenCenter: { x: Number, y: Number }): { x: Number, y: Number };

/**
 *
 * @param {Number} root
 * @param {Number} bones
 * @param {Number} index
 * @returns {{x: Number, y: Number, z: Number}}
 * @constructor
 */
declare function GetBoneLocation(root: Number, bones: Number, index: Number): { x: Number, y: Number, z: Number };

/**
 *
 * @param {{x: Number, y: Number, z: Number}} location
 * @param {Number} POV 指针
 * @param {Number} nowRotation 指针
 * @param {Number} outRotation 指针
 * @returns {{Pitch: Number, Yaw: Number, Roll: Number}}
 * @constructor
 */
declare function CalcControlRotation(location: { x: Number, y: Number, z: Number }, POV: Number, nowRotation: Number, outRotation: Number);





