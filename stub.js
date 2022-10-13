#!/usr/bin/env node
let readline = require("readline-sync");
const meClass = "8";
const Stub = "Stub";
const fs = require('fs')
const { loadImage, createCanvas } = require('canvas');
const { Console } = require("console");
const { axios } = require("axios");
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
  let globalName;
  let globalEAddr;
  let globalPin;
  let globalPass;
  if(arguments[0] === "install") {
      console.clear();
      console.log("Starting Stub Installer. You can go to previous menu by pressing 'prev' or exit by using 'shut'");
      async function askName(Stub) {
        const name = readline.question("\nAlright! Please enter your name: ");
        if(name === undefined || name === null || name.length === 0) {
            console.log("\nSorry, Invalid response received!");
            await askName(Stub);
        }
        if(name === "exit" || name === "shutdown" || name === "shut") {
            await askCommand();
        }
        if(name === "prev") {
            console.log("Sorry, This is the first step of Stub-VM setup. You can't use 'prev' command here");
            await askName(Stub);
        }
        globalName = name;
        await userPIN2(Stub, name);
      };
      await askName(Stub);
      
      async function userPIN2(Stub, name) {
          const userPIN = readline.question(`\nWelcome to Stub ${name}! Please enter a strong PIN atleast of 10 digits: `);
          if(userPIN === undefined || userPIN === null || userPIN.length === 0) {
             console.log("\nSorry, Invalid PIN received! Please try again!");
             await userPIN2(Stub, name);
          }else
          if(userPIN === "exit" || userPIN === "shutdown" || userPIN === "shut") {
            await askCommand();
          }else
         
          if(userPIN === "prev") {
            console.log("Going to previous step! Previously received the name as " + name);
            console.log("_________________________________________________________");
            await askName(Stub);
        }else if(Number(userPIN) === NaN || Number(userPIN) === "NaN") {
            console.log("\nSorry, Invalid PIN received! Please try again!");
             await userPIN2(Stub, name);
        }else if(userPIN.length <= 9) {
            console.log("\nToo Short pin! The pin must be atleast of 10 digits! Please try again!");
            await userPIN2(Stub, name);
        }
        else{
            await reAskUserPIN(name, userPIN);
        }
        
      }

      async function reAskUserPIN(name, userPIN) {
          const userPIN_Confirmer = readline.question("\nKindly re-enter your PIN for confirmation: ");
          if(userPIN_Confirmer === undefined || userPIN_Confirmer === null || userPIN_Confirmer.length === 0) {
            console.log("\nSorry, Invalid PIN received! Please try again!");
            await reAskUserPIN(Stub, name);
         }else
         if(userPIN_Confirmer === "exit" || userPIN_Confirmer === "shutdown" || userPIN_Confirmer === "shut") {
           await askCommand();
         }else
        
         if(userPIN_Confirmer === "prev") {
           console.log("Going to previous step! Previously received the name as " + name);
           console.log("_________________________________________________________");
           await userPIN2(Stub, name);
       }else if(Number(userPIN_Confirmer) === NaN || Number(userPIN_Confirmer) === "NaN") {
           console.log("\nSorry, Invalid PIN received! Please try again!");
            await userPIN2(Stub, name);
       }else if(userPIN_Confirmer.length <= 9) {
           console.log("\nToo Short pin! The pin must be atleast of 10 digits! Please try again!");
           await userPIN2(Stub, name);
       }else if(userPIN_Confirmer !== userPIN) {
           console.log("\nInvalid PIN! The PINs entered in both the cases don't match. Please try again!");
           await userPIN2(Stub, name);
       }
       else{
           globalPin = userPIN;
           await continueUserEmailAddress(name, userPIN);
       }
      }

     async function continueUserEmailAddress(name, userPIN) {
         try {
            const userEmail = readline.questionEMail("\nAlright! Please enter your email address to create a Stub Account: ");
            globalEAddr = userEmail;
            await askForPassword(name, userPIN, userEmail);
         }catch(Error){
            console.error(Error);
         }
     }

     async function askForPassword(name, userPIN, userEmail) {
        try {
            const userPassword = readline.question("\nNow, Please enter a strong password that consists of atleast 10 characters: ");
            if(userPassword.length === 0 || userPassword === "") {
                console.error("\nInvalid Password received! Please try again!");
                await askForPassword(name, userPIN, userEmail);
            }else if(userPassword.length <= 9) {
                console.error("\nToo short password! Please try again!");
                await askForPassword(name, userPIN, userEmail);
            }else{
                globalPass = userPassword;
                await createAnAccount(name, userPIN, userEmail, userPassword);
            }
        }catch(error) {
            console.error(error);
        }
     }

    async function createAnAccount(name, userPIN, userEmail, userPassword) {
         console.warn("\nFirst of all, make sure that you are connected to the Internet.");
         console.log("\nCreating your account. Please wait...");
         axios.post("http://localhost:3000/vm/auth", {
            userName:name,
            userEmail: userEmail,
            userPassword: userPassword,
            userPIN: userPIN,
        })
        .then((response) => {
            const uid = response.data.uid;
             console.log(response.data.message);
        }, (error) => {
            console.error(error);
        });
    }
  }

  

  if(arguments[0] === "mkdir") {
     console.log(arguments[1]);
  }
  if(arguments[0] === "author") {
     console.log("Welcome to Stub-VM!");
     console.log("The Stub-VM is designed and created by Namish Kumar, a student of class " + meClass);
  }
    await askCommand();
}