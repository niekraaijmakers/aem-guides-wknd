'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const paths = require('../paths');
const aemPack = require('aempack');

const developWithSSR = process.env.DEVELOPSSR || 'false';
const webpackConfig = require('./../webpack.aem-dev');

const user = process.env.AEMUSER  || 'admin';
const password = process.env.AEMPW || 'admin';

const aemPort = process.env.AEMPORT || 4502;
const aemHost = process.env.AEMHOST || 'localhost';


const proxyHost = process.env.PROXYHOST || 'localhost';
const proxyPort = process.env.PROXYPORT || 443;

const computeProxyUrl = () => {

    const port = proxyPort === 80 ? '' : ':' + aemPort;
    return 'http://' + proxyHost + port;
};


aemPack({
    browserSync: {
        https: true,
        enabled: true,
        sendDispatcherHeader: true,
        proxyUrl: computeProxyUrl(),
        proxyPort: proxyPort
    },
    webpackConfig: webpackConfig,
    disableServerSideRendering: !developWithSSR,

    aemProtocol: 'http',
    aemHost: aemHost,
    aemPort: aemPort,
    aemUser: user,
    aemPassword: password,

    verbose: true,

    clientLibRelativePath: paths.clientLibRelativePath,
    clientLibAbsolutePath: paths.clientLibRoot,

});



