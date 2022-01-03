// const commoncfg = {
//   title: '',
// };

const getters = {
  // 获取 View Layout HTML 元素
  getViewLayout: () => {
    return document.querySelector('.main.view-layout');
  }
};

const mutations = {
  // 设置网页标题
  setWebsiteTitle: (state: any, param: string) => {
    document.title = `${document.title} - ${param}`;
  },
};

export default {
  getters,
  mutations,
};
