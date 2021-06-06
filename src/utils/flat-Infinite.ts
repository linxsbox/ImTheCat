import { isObject, isIterable, isArrayLike } from './checkType';

/**
 * @param arr 任意类型
 * @returns 拍平去重排序转换成员为数字且去除NaN后的数组
 */
export function flatten(arr:any):number[] {
  if(typeof arr !== 'object' || arr === null){
    return [+arr];
  }
  if(isIterable(arr) || isArrayLike(arr)){
    const valueArr:any[] = Array.from(arr);
    const flattenArr:number[] = valueArr.reduce((pre: any[], item:any) => {
      pre.push(...flatten(item));
      return pre;
    }, []);
    // elimination & sort
    return [...new Set(flattenArr)].sort((a, b) => a - b).filter((x:number) => !Number.isNaN(x));
  }
  // handle object
  if (isObject(arr)){
    const temp = Object.values(arr);
    return flatten(temp);
  }
  // handle others
  else {
    return [+arr];
  }
}