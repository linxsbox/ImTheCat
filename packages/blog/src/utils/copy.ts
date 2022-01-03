import { isFunction, isObject, isArray } from './checkType';

/**
 * 拷贝/复制
 * 通过递归遍历对象/数组属性来实现数据的拷贝/复制
 * 1. 如果是函数类型(function)，直接返回该函数
 * 2. 判断是对象还是数组，并创建一个新的对象/数组
 * 3.
 * @param target 原目标对象
 * @param deep 是否深度 copy
 * @return clone 被克隆/拷贝的对象
 */
export function copy (target: any, deep = false): any {
  if (isFunction(target)) {
    return target;
  }
  const clone: any = isArray(target) ? [] : {};
  if (isObject(target)) {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        clone[key] = copy(target[key], deep);
      }
    }
  }else if (isArray(target)) {
    target.forEach((item: any) => {
      clone.push(copy(item, deep));
    });
  } else { return target; }
  return clone;
}

/**
 * 此实现会有数组类型牵引问题，必须加入实现对数组类型的处理
 */
// export function copy (target: any, deep = false): any {
//   if (isFunction(target)) {
//     return target;
//   }
//   const clone: any = isArray(target) ? [] : {};
//   for (const key in target) {
//     if (Object.prototype.hasOwnProperty.call(target, key)) {
//       const item = target[key];
//       clone[key] = deep && isObject(item) ? copy(item, true) : item;
//     }
//   }
//   return clone;
// }
