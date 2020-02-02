const fs = require('fs')
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const sources = resolveApp('src/main/webpack/');

module.exports = {

    sources: sources,
    entryPoint: sources + '/site/main.js',
    tsConfig: resolveApp('tsconfig.json'),
    clientLibRoot: resolveApp('../ui.apps/src/main/content/jcr_root/etc/wknd/clientlibs/clientlib-site'),
    clientLibRelativePath: '/etc/wknd/clientlibs/clientlib-site'
};
