#!/usr/bin/env node
const program = require('commander');
const request = require('request');
const path = require('path');
const fs = require('fs');
const tar = require('tar-fs');

program
    .option('-u --username [username]', 'Username signing code for deploy')
    .option('-a --app [app]', 'App name being deployed')
    .parse(process.argv);

console.log(program.username);
console.log(program.app);

doDeploy(program.username, program.app);

function doDeploy(username, app) {
    let directory = tar.pack('./', {
        ignore: (name) => {
            return false;  // return true for files to be ignored
        }
    });

    let target = `http://localhost:1111/deploy/${username}/${app}`;
    let ws = request.post(target);

    ws.on('drain', () => {
        console.log('drain', new Date());
    });

    ws.on('end', () => {
        console.log('File deployed');
    });

    ws.on('error', (e) => {
        console.log('Error sending file: ' + e);
    });

    directory.pipe(ws);
}