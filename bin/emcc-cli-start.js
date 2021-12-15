#!/usr/bin/env node

const exec = require('child_process').exec;
const inquirer = require('inquirer');

const CMDs = {
    defaultC: "emcc index.c -O3 -s SIDE_MODULE=1 -o out.wasm",
    defaultCC: "emcc index.cc -O3 -s SIDE_MODULE=1 -o out.wasm"
}

const doEmcc = (cmd) => {
    exec(cmd, (error, stdout) => {
        if(error) console.log(error)
        else console.log('done')
    })
}

inquirer
    .prompt([
        {
            type: 'list',
            message: 'select one',
            name: 'begin',
            choices: [
                `1. default with C (${CMDs.defaultC})`,
                `2. default with C++ (${CMDs.defaultCC})`,
                '3. manually select'
            ]
        },
        {
            type: 'input',
            message: 'input file',
            name: 'input',
            default: 'index.c',
            when: (before) => {
                return before.begin === '3. manually select'
            }
        },
        {
            type: 'list',
            message: 'omicron',
            name: 'omicron',
            choices: ['O0', 'O1', 'O2', 'O3', 'Os', 'Oz'],
            default: 'O3',
            when: (before) => {
                return before.begin === '3. manually select'
            }
        },
        {
            type: 'list',
            message: 'side or main',
            name: 'SoM',
            choices: ['MAIN_MODULE', 'SIDE_MODULE'],
            default: 'MAIN_MODULE',
            when: (before) => {
                return before.begin === '3. manually select'
            }
        },
        {
            type: 'list',
            message: 'output type',
            name: 'output',
            choices: ['wasm', 'js', 'html'],
            default: 'wasm',
            when: (before) => {
                return before.begin === '3. manually select'
            }
        }
    ])
    .then((ans) => {
        if(ans.begin[0] === '1') {
            const cmd = CMDs.defaultC
            doEmcc(cmd)
        }
        else if(ans.begin[0] === '2') {
            const cmd = CMDs.defaultCC
            doEmcc(cmd)
        }
        else if(ans.begin[0] === '3') {
            const cmd = `emcc ${ans.input} -${ans.omicron} -s ${ans.SoM}=1 -o out.${ans.output}`
            doEmcc(cmd)
        }
    })
    .catch((err) => {
        console.log(err)
    })