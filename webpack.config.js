'use strict';

const path = require('path'); // node 原生 path 模块
const args = require('minimist')(process.argv.slice(2));

const allowedEnvs = ['dev', 'dist', 'test'];

let env;

if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
} else if (args.env) {
    env = args.env;
} else {
    env = 'dev';
}

process.env.REACT_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return Object} Webpack config
 */

function buildConfig (myEnv) {
    let isValid = myEnv && myEnv.length > 0 && allowedEnvs.indexOf(myEnv) !== -1;
    let validEnv = isValid ? myEnv : 'dev';
    let config = require(path.join(__dirname, 'cfg/' + validEnv));
    return config;
}

console.log(buildConfig(env).module.rules)

module.exports = buildConfig(env);