#!/usr/bin/env node

const process = require("process");
const exec = require("child_process").exec;
const { Command, Option} = require("commander");
const program = new Command();

program
    /********** options **********/
    .requiredOption('-i, --input <input>', 'input file')
    .option('-o, --output <output>', 'output file')
    // .addOption(new Option('-O <complex>', 'default to "O3"').choices(['O0', 'O1', 'O2', 'O3', 'Os', 'Oz']))
    .addOption(new Option('-t, --type <type>', 'output type (default: wasm)').choices(['wasm', 'js', 'html', 'default']))

    /********** parse **********/
    .parse(process.argv)

    /********** help **********/
    .showHelpAfterError(true)
    .showSuggestionAfterError(true)

/********** dev funcs **********/
/**
 * @return {{
 * output: string,
 * input: string,
 * type: "wasm"|"js"|"html"|"default"
 * }}
 */
const solveArgs = () => {
    let {input, output, type} = opts

    type = type ? ((type === 'default') ? 'wasm' : type) : 'wasm'

    if(output) {
        if(output.includes('.')) {
            if(['wasm', 'js', 'html'].includes(
                output.slice(output.lastIndexOf('.')+1)
            )) {
                type = output.slice(output.lastIndexOf('.')+1)
            }

            output = output.slice(0, output.lastIndexOf('.'))
        }
    } else {
        output = 'out'
    }

    return {input, output, type}
}

/********** main **********/
const opts = program.opts();

if(Reflect.ownKeys(opts).length === 0) {
    console.log('[Warning] Please use the correct syntax, enter "emcc-cli -h" to view the whole help information.\n')
    program.help()
}
else {
    const { input, output, type } = solveArgs()

    const cmdStr = `emcc ${input} -O3 -s SIDE_MODULE=1 -o ${output}.${type}`
    exec(cmdStr, (error, stdout) => {
        if(error) console.log(error)
        else {
            console.log('command run success')
        }
    })
}