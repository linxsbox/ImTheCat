
const tplECMAScript = require('./tpl-js.js').default;
const tplTypeScript = require('./tpl-ts.js').default;
const tplTypeScriptV3 = require('./tpl-tsv3.js').default;
const tplHandle = require('./tpl-handle.js').default;
const tplCSS = require('./tpl-css.js').default;
const tplAPI = require('./tpl-api.js').default;

const pascalMinName = className => {
  const splitStr = className.split('');
  const regz = /^[A-Z]+$/;
  return splitStr.map((item, index) => {
    return regz.test(item) ? `${index !== 0 ? '-' : ''}${item.toLowerCase()}` : item;
  }).join('');
};

const build = (pascalName, fileName, codeType, cssType) => {
  const switchType = (str) => {
    switch (str) {
      case 'js':
        return { lang: '', template: tplECMAScript(pascalName) };
      case 'ts':
        return { lang: ' lang="ts"', template: tplTypeScript(pascalName) };
      case 'tsv3':
        return { lang: ' lang="ts"', template: tplTypeScriptV3(pascalName) };
      default:
        return { lang: ' lang="ts"', template: tplTypeScript(pascalName) };
    }
  };
  const { lang, template } = switchType(codeType);

  return `<template>
  <div class="${pascalMinName(fileName)}-container">
    {{ msg }} {{ name }}
  </div>
</template>

<script${lang}>
${template}
</script>

<style${cssType !== 'css' ? ' lang="' + cssType + '"' : ''} scoped src="./index.${cssType}">
  /* @import url('index.${cssType}'); */
</style>
`;
};

module.exports = {
  build,
  tplHandle,
  tplCSS,
  tplAPI
};
