<template>
  <div></div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
// import * as asort from './algorithm';

export default class Algorithm extends Vue {
  arr1 = [9, 4, 3, 1, 6, 8, 5, 0, 7, 2]; // 乱序
  arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 顺序
  arr3 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]; // 逆序

  mounted () {
    console.log('algorithm');

    // asort.BubbleSort(arr1); // 乱序：O(n)，需要 n-1 次比较，0 次交换，其中 n 为数据个数
    // asort.BubbleSort(arr2); // 顺序：O(n^2) -
    // asort.BubbleSort(arr3); // 逆序：O(n^2) -

    // asort.insertionSort(arr1); // 乱序：O(n)，需要 n-1 次比较，0 次交换，其中 n 为数据个数
    // asort.insertionSort(arr2); // 顺序：O(n^2) -
    // asort.insertionSort(arr3); // 逆序：O(n^2) -
  }
}
</script>