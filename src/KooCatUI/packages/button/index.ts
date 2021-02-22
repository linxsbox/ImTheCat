import KcButton from './button.vue';

/* istanbul ignore next */
const install = function (app: any) {
  app.component(KcButton.name, KcButton);
};

const mergeInstallButton = Object.assign(KcButton, { install });

export default mergeInstallButton;
