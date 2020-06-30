export enum dataType {
  // null = 'null',
  // undefined = 'undefined',
  string = 'string',
  number = 'number',
  bigint = 'bigint',
  boolean = 'boolean',
  symbol = 'symbol',
  function = 'function',
  object = 'object',
  array = 'array'
}

export function isType (value?: any) {
  console.log('isType', typeof value);
  const typeValue = typeof value;
  const splitTypeStr = Object.prototype.toString.call(value)
    .replace(/\[|\]/ig, '').split(' ')[1];
  return typeValue !== 'object'
    ? typeValue : value !== null
      ? splitTypeStr.toLowerCase() : null;
}

function equalType (type?: dataType) {
  return (val?: any) => type === isType(val);
}

export const isNull = (val?: any) => val === null;
export const isUndefined = (val?: any) => 'undefined' === isType(val);
export const isString = equalType(dataType.string);
export const isNumber = equalType(dataType.number);
export const isBigint = equalType(dataType.bigint);
export const isBoolean = equalType(dataType.boolean);
export const isSymbol = equalType(dataType.symbol);
export const isFunction = equalType(dataType.function);
export const isObject = equalType(dataType.object);
export const isArray = Array.isArray;
