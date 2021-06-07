import { isObject, isIterable, isArrayLike } from './checkType';

/**
 * 生成拍平去重+类型转换的函数
 * @param cb 类型转换函数
 * @returns 拍平去重+类型转换的函数
 */
export function typeFlatten(cb:any) {
  return function flatten(arr:any):any[] {
    if(typeof arr !== 'object' || arr === null){
      return [cb(arr)];
    }
    if(isIterable(arr) || isArrayLike(arr)){
      const valueArr:any[] = Array.from(arr);
      const flattenArr:any[] = valueArr.reduce((pre: any[], item:any) => {
        pre.push(...flatten(item));
        return pre;
      }, []);
      // elimination
      return [...new Set(flattenArr)];
    }
    // handle object
    if (isObject(arr)){
      const temp = Object.values(arr);
      return flatten(temp);
    }
    // handle others
    else {
      return [cb(arr)];
    }
  }
}

/**
 * 拍平去重排序转换成员为数字且去除NaN
 * @param arr 任意类型
 * @returns 拍平去重排序转换成员为数字且去除NaN后的数组
 */
export const nFlatten = (function(){
  const nFlattenHelper = typeFlatten(Number);
  return function(arr:any){
    return nFlattenHelper(arr).sort((a, b) => a - b).filter((x:number) => !Number.isNaN(x));
  }
})();

/**
 * 拍平去重+转换字符串
 * @param arr 任意类型
 * @returns 拍平去重排序转换成员为字符串后的数组
 */
export const sFlatten = typeFlatten(String);

/**
 * 拍平去重+转换布尔值
 * @param arr 任意类型
 * @returns 拍平去重排序转换成员为布尔值后的数组
 */
export const bFlatten = typeFlatten(Boolean);