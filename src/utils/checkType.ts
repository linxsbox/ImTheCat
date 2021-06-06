// // 禁止声明影子变量，7.9.0 版本定义 enum 会意外触发此规则
// eslint-disable-next-line no-shadow
enum dataTypeEnum {
  // null = 'null',
  // undefined = 'undefined',
  string = 'string',
  number = 'number',
  bigint = 'bigint',
  boolean = 'boolean',
  symbol = 'symbol',
  function = 'function',
  object = 'object',
  array = 'array',
  date = 'date',
  regexp = 'regexp',
  htmlcollection = 'htmlcollection',
  error = 'error',
  math = 'math',
  json = 'json',
  set = 'set',
  weakset = 'weakset',
  map = 'map',
  weakmap = 'weakmap',
  promise = 'promise',
}

export function isType (value?: any) {
  // console.log('isType', typeof value);
  const typeValue = typeof value;
  const splitTypeStr = Object.prototype.toString.call(value)
    .replace(/\[|\]/ig, '').split(' ')[1];
  return typeValue !== 'object'
    ? typeValue : value !== null
      ? splitTypeStr.toLowerCase() : 'null';
}

function equalType (type?: dataTypeEnum) {
  return (val?: any) => type === isType(val);
}

export const isNull = (val?: any) => val === null;
export const isUndefined = (val?: any) => 'undefined' === isType(val);
export const isString = equalType(dataTypeEnum.string);
export const isNumber = equalType(dataTypeEnum.number);
export const isBigint = equalType(dataTypeEnum.bigint);
export const isBoolean = equalType(dataTypeEnum.boolean);
export const isSymbol = equalType(dataTypeEnum.symbol);
export const isFunction = equalType(dataTypeEnum.function);
export const isObject = equalType(dataTypeEnum.object);
export const isArray = Array.isArray;
export const isDate = equalType(dataTypeEnum.date)
export const isRegExp = equalType(dataTypeEnum.regexp);
export const isHtmlCollection = equalType(dataTypeEnum.htmlcollection);
export const isError = equalType(dataTypeEnum.error);
export const isMath = equalType(dataTypeEnum.math);
export const isJson = equalType(dataTypeEnum.json);
export const isSet = equalType(dataTypeEnum.set);
export const isWeakSet = equalType(dataTypeEnum.weakset);
export const isMap = equalType(dataTypeEnum.map);
export const isWeakMap = equalType(dataTypeEnum.weakmap);
export const isPromise = equalType(dataTypeEnum.promise);

export const isIterable = (x:any) => x[Symbol.iterator] !== undefined;
export const isArrayLike = (x:any) => x.length !== undefined;
