// 冒泡排序
export function BubbleSort (arr: number[]) {
  // 空间复杂度：O(1)，直接在给定的数组里交换，无需额外空间。
  // 时间复杂度：O(n^2)
  // 冒泡排序的特点：
  // 每一轮都从数组头部开始，将2个元素进行大小比较并交换位置，
  // 每经过一轮排序，数组尾部的数据都是排好的。

  // let mplen = arr.length - 1;
  const mplen = arr.length; // 使用 length 的话会出现内循环下标越界问题：（1）
  let count = 0;
  console.log('原排序', arr);
  for (let index = 0; index < mplen; index++) {
    // 因判断条件为 index < length 不会出现 index = length 的情况。
    // 例：length = 10 时 index 最大值为 9。
    // console.log(index, arr[index]);
    for (let j = 0; j < mplen - index; j++) {
      // （1）主要是因为两两对比当前数与下一位数，即是 j 与 j+1。
      // 当 j = index 时， j+1 则会出现越界情况，即 arr[length] 为 undefined。
      // length 为总数而下标则是从 0 开始。
      // if (index === 0) {
      //   console.log(j, j + 1);
      // }
      if (arr[j] > arr[j + 1]) {
        // console.log('前：', arr[j] , arr[j + 1]);
        // const tempA = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = tempA;

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // console.log('后：', arr[j] , arr[j + 1]);
        count++;
      }
    }
    // console.log('新排序', arr);
  }
  console.log('新排序', arr);
  console.log('次数：', count);
}

// 插入排序
export function insertionSort (arr: number[]) {
  // 空间复杂度：O(1)，直接在给定的数组里交换，无需额外空间。
  // 时间复杂度：O(n^2)
  // 冒泡排序的特点：
  // 每一轮都从数组头部开始，将2个元素进行大小比较并交换位置，
  // 每经过一轮排序，数组头部的数据都是排好的。
  console.log('原排序', arr);
  for (let index = 1, j = 0; index < arr.length; index++) {
    // 因是插入排序后面的元素插入头部，所以需要 index 从 1 开始，如果从 0 开始则后元素插入的下标是 -1
    // 先保存需要被插入的元素
    const item = arr[index];
    for (j = index - 1; j >= 0 && arr[j] > item; j--) {
      console.log('arr[j] > item');
      console.log('%s > %s', arr[j], item);
      // 因为内循环是从右向左排序，即 length-- ,首先需要剔除自减 1 后可能成为 arr[-1] 越界的情况
      // j 随着 index 的右移而改变起始位置，当当前元素大于被插入元素时，
      // 将当前元素放置到当前下标的后一位元素位置，即 j + 1 = j
      console.log('arr[j + 1] = arr[j];');
      console.log('arr[%s] =  arr[%s];', j + 1, j);
      console.log(arr[j + 1], arr[j]);
      console.log('---');
      arr[j + 1] = arr[j];
    }
    // console.log('---')
    arr[j + 1] = item;
    console.log('---', j, j + 1);

  }
  console.log('新排序', arr);
  // console.log('次数：', count);
}
