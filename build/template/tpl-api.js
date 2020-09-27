module.exports.default = (fileApi, pascalName, fileName) => fileApi ? `// ${fileName} api 集合
function get${pascalName} (params) {
  return http('url', {
    data: params
  })
}
function submit${pascalName} (params) {
  return http('url', {
    data: params
  })
}
` : '';