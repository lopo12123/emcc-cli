#!/usr/bin/env node

const process = require('process');
const { Command } = require('commander');
const program = new Command();

const v = require('../package.json').version;

program
    /********** usage **********/
    .usage('<command> [options]')

    /********** version **********/
    .version(v, '-v, --version')

    /********** commands **********/
    .command('do', 'do transform with options')
    .command('start', 'do transform with custom choices')
    .command('origin', 'run origin command of "emcc"')

    /********** parse **********/
    .parse(process.argv)

    /********** help **********/
    .showHelpAfterError(true)
    .showSuggestionAfterError(true)

/********** note **********/
/**
 * "emcc-cli do [options]" is parsed in ./emcc-cli-do.js
 * "emcc-cli start" is parsed in ./emcc-cli-start.js
 */
