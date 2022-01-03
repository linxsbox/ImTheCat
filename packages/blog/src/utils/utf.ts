/**
 * 将字符串转为 UnitArray 类型
 * @param str 字符串
 * @param bit 字节位 number 8(default) || 16
 */
function str2UnitArray (str: string, bit = 8) {
  const tmpStr = decodeURIComponent(encodeURIComponent(str));
  const strLen = tmpStr.length; // 字符长度
  const buf = new ArrayBuffer(strLen); // 通过字符长度创建 ArrayBuffer

  // 将 ArrayBuffer 转换为 UintArray
  const bufView = bit !== 16 ? new Uint8Array(buf) : new Uint16Array(buf) ;

  // 遍历 tmpStr
  for (let i = 0; i < strLen; i++) {
    // 将字符转换为 Unicode 并替换 UintArray 中的元素
    bufView[i] = tmpStr.charCodeAt(i);
  }
  return bufView;
}

/**
 * Uint8Array to String（支持中文）
 * 它不使用任何技巧, 也不依赖于 Browser JS 函数, 例如在其他 JS 环境中也可以使用，其实现通过 UTF-8 编码约定实现
 * @param array Uint8Array
 */
export const uint8atos = (array: Uint8Array) => {
  if (TextDecoder) {
    const codeChar = new TextDecoder('utf-8');
    return codeChar.decode(array);
  }

  /* utf.js - UTF-8 <=> UTF-16 convertion
   *
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   *
   * link: http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
   */
  let out = ''; // 记录输出内容
  let index = 0; // Array 元素下标
  let constant; // 记录当前子元素
  let char2, char3; // 字符记录

  const len = array.length; // Array 长度

  while (index < len) {
    constant = array[index++];
    // eslint-disable-next-line default-case
    switch (constant >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(constant);
        break;
      case 12: case 13:
        // 110x xxxx  10xx xxxx
        char2 = array[index++];
        out += String.fromCharCode(((constant & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[index++];
        char3 = array[index++];
        out += String.fromCharCode(((constant & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
};

/**
 * String to Unit8Array 基于可支持 TextEncoder 和 TextDecoder 函数的宿主环境，如确认支持则可考虑优先使用
 * @param str string
 */
export const uint8stoa = (str: string) => {
  // 环境支持 TextEncoder 函数，此函数最终返回的是 Uint8Array 类型
  if (TextEncoder) {
    const codeChar = new TextEncoder();
    return codeChar.encode(str);
  }

  return str2UnitArray(str, 8);
};

/**
 * Unit16Array to String
 * @param array Unit16Array
 */
// export const uint16atos = (array: Uint16Array) => {};

/**
 * String to Unit16Array
 * @param str string
 */
// export const uint16stoa = (str: string) => str2UnitArray(str, 16);
