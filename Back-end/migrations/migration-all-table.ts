import * as fs from 'fs';
import * as path from 'path'
import {exec, execFile} from 'child_process';


console.log("migration-all-table");

    //**************** */ exec로 실행
    //버전 1(상대경로)
    exec('./node_modules/.bin/ts-node "./src/migration/create-db.ts"', (error, stdout, stderr) => {
         if(error){
             console.log(`exec drror : ${error}`);
             return;
         }
         if(stdout) console.log(`${stdout}`);
         if(stderr) console.log(`err : ${stderr}`);
     });
    //버전 2(절대경로)
     exec(`./node_modules/.bin/ts-node "${__dirname}/create-db.ts"`, (error, stdout, stderr) => {
             if(error){
                 console.log(`exec drror : ${error}`);
                 return;
             }
             if(stdout) console.log(`${stdout}`);
             if(stderr) console.log(`err : ${stderr}`);
         });
    //******************* */

    ///******* */ execFile로 실행
    //버전 1 (상대경로)
     execFile('./node_modules/.bin/ts-node',['./src/migration/create-db.ts'], (error, stdout, stderr) => {
         if(error){
             console.log(`exec error : ${error}`);
             return;
         }
         if(stdout) console.log(`${stdout}`);
         if(stderr) console.log(`err : ${stderr}`);
     })

    //버전 2 (절대경로)
     execFile('./node_modules/.bin/ts-node',[`${__dirname}/create-db.ts`], (error, stdout, stderr) => {
         if(error){
             console.log(`exec error : ${error}`);
             return;
        }
        if(stdout) console.log(`${stdout}`);
         if(stderr) console.log(`err : ${stderr}`);
     })
    ///******************** */