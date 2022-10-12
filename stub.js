#!/usr/bin/env node
let readline = require("readline-sync");
const fs = require('fs')
const { loadImage, createCanvas } = require('canvas')
console.log("Welcome to Stub! Starting the Stub System!");
const version = "1.0.0";
let allCommands = ["exit", "time", "hello", "system", "reset", "version", "start", "update", "date", "clear", "cls", "app-store", "shutdown", "install", "app-launcher", "mkdir"];
askCommand();
async function askCommand() {
    const rawCommand = readline.question("user@stub $ ");
    if(rawCommand === "" || rawCommand === "\n" || rawCommand === undefined || rawCommand === null || rawCommand === Infinity || rawCommand.length === 0 ||rawCommand === "undefined" || rawCommand === "null") {
        await askCommand();  
    }
    processCommand(rawCommand);
}
async function processCommand(rawCommand) {
    const arguments = rawCommand.split(' ');
    if(!allCommands.includes(arguments[0])) {
        console.error(`'${arguments[0]}' is not defined as a Stub command. SVM error code 400! <Error.400>`);
        await askCommand();
    }


    if(arguments[0] === "exit" || arguments[0] === "shutdown") {
         process.exit(0);
    }

    if(arguments[0] === "time") {
        const now = new Date()
  .toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  .toLowerCase();
        console.log(`The time is ${now}`);
    } 
  if(arguments[0] === "version") {
     console.log("Stub VM version: 1.0.0. You can also use the update command to update the system.");
  }

  if(arguments[0] === "date") {
    
  }
  if(arguments[0] === "clear" || arguments[0] === "cls") {
     console.clear();
  }
  if(arguments[0] === "install") {
      console.clear();
      console.log("Starting Stub Installer. Please wait...");
  }

  

  if(arguments[0] === "mkdir") {
     console.log(arguments[1]);
  }
    await askCommand();
}