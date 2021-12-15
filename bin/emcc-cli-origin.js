#!/usr/bin/env node

const process = require('process');
const exec = require('child_process').exec;

const args = process.argv.slice(2);
if( args[0]!== 'emcc') {
    args.unshift('emcc');
}
const cmdStr = args.join(' ');

exec(cmdStr, (error, stdout) => {
    if(error) console.log(error)
    else {
        console.log('command run success')
    }
})