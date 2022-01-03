module.exports.default = (fileName) => `// import * as apis from '@/apis/${fileName}';

function getFn () { return ['${fileName}']; }

export default getFn;
`;