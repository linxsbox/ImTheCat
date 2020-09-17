import { AxiosStatic, AxiosPromise } from 'axios';

type fnType = () => void;
type batchTasks = AxiosPromise[] | any[];

function flushCallBacks (tasks: batchTasks) {
  //
  tasks.forEach((itemTask, index) => {
    //
  });
}

// function rangeQueue () {
//   //
// }

class InitBatchTasks {
  MaxTryCount: number;
  MaxParallelNumber: number;

  batchCallBacks: batchTasks;

  constructor (tasks: batchTasks , MaxTryCount?: number, MaxParallelNumber?: number) {
    // Maximum number of attempts.
    const MAX_TRY_COUNT = 5;
    // Maximum number of concurrency requests.
    const MAX_PARALLEL_NUMBER = 5;

    const batchCallBacks: AxiosPromise[] = [];

    this.MaxTryCount = MaxTryCount || MAX_TRY_COUNT;
    this.MaxParallelNumber = MaxParallelNumber || MAX_PARALLEL_NUMBER;
    this.batchCallBacks = tasks;

  }

  queue (cb: fnType) {
    //
  }
}

export default InitBatchTasks;
