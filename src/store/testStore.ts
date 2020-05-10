const getters = {
  getTest: (state: any) => {
    return state.test;
  },
  getList: (state: any) => {
    return state.list;
  },
  getNum: (state: any) => {
    return state.num;
  },
};

const mutations = {
  setTest: (state: any, param: any) => {
    // debugger;
    state.test = param;
  },
  setList: (state: any, param: any) => {
    // debugger;
    state.list = param;
  },
  setNum: (state: any, param: any) => {
    // debugger;
    state.num = param;
  },
};

const actions = {
  setTest: ({ commit }: any, params: any) => {
    setTimeout(() => {
      commit(params);
    }, 1000);
  },
  setList: ({ commit }: any, params: any) => {
    setTimeout(() => {
      commit(params);
    }, 1000);
  },
  setNum: ({ commit }: any, params: any) => {
    setTimeout(() => {
      commit(params);
    }, 1000);
  },
};

export default {
  getters,
  mutations,
  actions,
};
