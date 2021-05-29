import { isType } from './checkType';

export function flatten(arr:Iterable<any>|ArrayLike<any>, deep:boolean=false):any[] {
  const typeArr:string[] = Array.from(arr, isType);
  const valueArr:any[] = Array.from(arr);
  const flattenArr:number[] = typeArr.reduce((pre: any[], item:string, index:number) => {
    const valueItem = valueArr[index];
    // handle iterable item or array like item
    const isIterableOrArrayLike:boolean = (valueItem[Symbol.iterator] !== undefined)
      || (valueItem.length !== undefined);
    if (isIterableOrArrayLike){
      if(deep){
        for(let child of Array.from(valueItem)){
          pre.push(...flatten([child]))
        }
      } else {
        pre.push(...Array.from(valueItem, (x:any) => +x));
      }
    }
    // handle Object
    else if (item.includes('Object')){
      const temp = Object.values(valueItem);
      if(deep){
        for(let child of temp){
          pre.push(...flatten([child]))
        }
      } else {
        pre.push(...temp.map((x:any) => +x));
      }
    }
    // handle others
    else {
      pre.push(+valueItem);
    }
    return pre;
  }, []);
  // elimination & sort
  return [...new Set(flattenArr)].sort((a, b) => a - b);
}