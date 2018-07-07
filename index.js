#!/usr/bin/env node
const program = require('commander');

program
    .arguments('<command>')
    .action(command => {
        console.log(command);
    })
    .parse(process.argv);

