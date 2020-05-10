import states from './states';
import common from './common';
import testStore from './testStore';

const init = (Vuex: any, store?: any) => {
  if (!Vuex) {
    console.error();
    
  }
  console.log();

  // return new Vuex.Store();
  return new Vuex.Store({
    modules: {
      common,
    },
    state: states,
    getters: testStore.getters,
    mutations: testStore.mutations,
    actions: testStore.actions,
  });
};

export default { init };
