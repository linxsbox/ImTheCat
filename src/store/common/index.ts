const commoncfg = {
  title: '',
};

const getters = {
  // 
};

const mutations = {
  // 设置网页标题
  setWebsiteTitle: (state: any, param: string) => {
    // debugger;
    document.title = `${document.title} - ${param}`;
    // state.common.website.title = param;
  },
};

export default {
  getters,
  mutations,
};
