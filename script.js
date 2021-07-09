#!/usr/bin/env node

const fs = require("fs");
const { formatWithOptions } = require("util");

//let data = fs.readFileSync("D:\New Text Document.txt", "utf-8");
//console.log(data); 
//console.log(fs.existsSync("abc.txt"));
//console.log(process.argv);

let arguments = process.argv.slice(2);

//console.log(arguments);

function wcat(arguments){
    let option = arguments.filter(function(data, index){
        return data.startsWith("-");
    });

    let files = arguments.filter(function(data, index){
        return !data.startsWith("-");
    });


    if(files.length == 0){
        console.log("please specify a file name");
        return;
    }

    let numbering = 1;

    for(let i = 0; i < files.length; i++){
        if(!fs.existsSync(files[i])){
            console.log(files[i] + " does not exists");
            return;
        }
    }

    for(let i = 0; i<files.length; i++){
        let data = fs.readFileSync(files[i], "utf-8");
        if(option.includes("-s")){
            let lines = data.split("\r\n");
            for(let j = 0; j < lines.length; j++){
                if(lines[j] != ""){
                    if(options.includes("-w")) {
                        let data = fs.readFileSync(files[1]);
                        fs.writeFileSync(files[1], data + lines[j] + "\n");
                    }else {
                        if (options.includes("-n") || options.includes("-b")) {
                            console.log(numbering + ". " + lines[j]);
                            numbering += 1;
                        } else {
                            console.log(lines[j]);
                        }
                    }
                }
            }
        }

        else if((option.includes("-n") && !option.includes("-b")) || (option.includes("-n") && option.includes("-b") && (option.indexOf("-n") < option.indexOf("-b")))){
            let lines = data.split("\r\n");
            for(let j = 0; j < lines.length; j++){
                console.log(numbering + ". ", lines[j]);
                numbering += 1;
            }
        }

        else if(option.includes("-b")){
            let lines = data.split("\r\n");
            for(let j = 0; j < lines.length; j++){
                if(lines[j] != ""){
                    console.log(numbering + ". ", lines[j]);
                    numbering += 1;
                }
                else{
                    console.log(lines[j]);
                }
            }
        }

        else if(option.includes("-w")){
            if(files.length != 2 || arguments.indexOf("-w") != 1){
                console.log("unable to run this command");
                return;
            }

            let data = fs.readFileSync(files[0], "utf-8");
            fs.writeFileSync(files[1], data);
        }

        else if(option.includes("-a")){
            if(files.length != 2 || arguments.indexOf("-a") != 1){
                console.log("unable to run this command");
                return;
            }

            let data1 = fs.readFileSync(files[0], "utf-8");
            let data2 = fs.readFileSync(files[1], "utf-8");

            fs.writeFileSync(files[1], data2 + data1);
            return;
        }

        else{
            console.log(data);
        }
    }
}
wcat(arguments);

// -n for numbering a line
// -s for removing empty lines
// -b for numbering a non-empty line
// -w to over write a file with another file
// -a to append a file into into another file
