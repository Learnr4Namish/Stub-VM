#!/usr/bin/env node
// Made by Namish Kumar in January 2023
// The Basic codes for StubVM and StubOS 1.0.0.
const System = require("./System");
let readline = require("readline-sync");
let readline2 = require("readline");
const meClass = "8";
const Stub = "Stub";
const fs = require('fs');
const { Console } = require("console"); 
console.log("Welcome to Stub! Starting the Stub System!");
console.clear();
const version = "1.0.0";
let allCommands = [
  "exit", 
  "time", 
  "hello", 
  "system", 
  "reset", 
  "version", 
  "start", 
  "update", 
  "date", 
  "clear", 
  "cls", 
  "app-store", 
  "shutdown", 
  "app-launcher", 
  "mkdir",
   "setup", 
   "restart", 
   "author", 
   "login", 
   "ls", 
   "wash", 
   "stub", 
   "notepote", 
   "day-name", 
"pow",
"sqrt",
"cbrt",
"sq",
"cb",
"eval",
"month-name",
"stub-site",
"filedexter",
"set-name",
"pi"];
let keywords = [
    "printf",
    "import",
    "newKeyword",
    "writeText",
    "FindSquare",
    "Sqrt",
    "sqrt",
    "FindCube",
    "Cbrt",
    "cbrt",
    "RaiseNumber",
    "Base",
    "Power",
    "UserInput",
    "GetDate",
    "GetTodayDay",
    "GetDay",
    "GetDayName",
    "Say",
    "Version",
    "Find",
    "Message",
    "Variable",
    "PrintVar",
    "WriteVar",
    "PrintInVar",
    "LoopWrite",
    "NewFile",
    "as",
    "CreateFile",
    "endl",
    "GetYear",
    "AddNumbers",
    "guessy",
    "GetSystemVar"
 ];
 class stubCompiler {
   constructor(codes, fileName) {
     this.codes = codes;
     this.fileName = fileName;
   }
   tokenize() {
     const length = this.codes.length
     let pos = 0
     let line = 1;
     let column = 0;
     let tokens = []
     let BUILT_IN_KEYWORDS = keywords;
     const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_()#N;{}1234567890'
     while (pos < length) {
       let currentChar = this.codes[pos]
       if (currentChar === " ") {
         pos++
         column++
         continue
       }else if(currentChar === "\n"){
           column = 0;
           pos++
           continue
       } else if (currentChar === '"') {
         let res = ""
         pos++
         column++
         while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
           res += this.codes[pos]
           pos++
         }
         if (this.codes[pos] !== '"') {
           return {
             error: `Incomplete String at line ${line}:${pos}`
           }
         }
         pos++
         tokens.push({
           type: "string",
           value: res
         })
       } else if (currentChar === "'") {
         let res = "";
         pos++
         while (this.codes[pos] !== "'" && this.codes[pos] !== '\n' && pos < length) {
           res += this.codes[pos]
           pos++
         }
         if (this.codes[pos] !== "'") {
           return {
             error: `Incomplete String at line ${line}:${pos}!`
           }
         }
         pos++
         tokens.push({
           type: "string",
           value: res
         })
       }
       else if (varChars.includes(currentChar)) {
         let res = currentChar
         pos++
         while (varChars.includes(this.codes[pos]) && pos < length) {
           res += this.codes[pos]
           pos++
         }
         if (!BUILT_IN_KEYWORDS.includes(res)) {
           return {
             error: `Stub Token Error:- Unexpected token ${res}. ${res} is not defined!`
           }
         }
         tokens.push({
           type: BUILT_IN_KEYWORDS.includes(res) ? "keyword" : "keyword_custom",
           value: res
         })
       }else if (currentChar === '='){
         pos++
         column++
         tokens.push({
           type: "operator",
           value: "eq"
         })
       }else if(currentChar === "+"){
         pos++
         column++
         tokens.push({
           type:"operator",
           value:"plus"
         })
       }else if (currentChar === '/'){
        pos++
        column++
        tokens.push({
         type: "operator",
         value: "comment"
       })
       }else if(currentChar === ":"){
         pos++
         column++
         tokens.push({
           type:"colon",
           value:"colon"
         })
       }else if(currentChar === ">"){
         pos++
         column++
         tokens.push({
           type:"lambda",
           value:"lambda",
         })
       }else if(currentChar === ","){
         pos++
         column++
         tokens.push({
           type:"comma",
           value:"comma",
         })
       }else if(currentChar === "("){
         pos++
         column++
         tokens.push({
           type:"leftCurve",
           value:"leftCurve",
         })
       }else if(currentChar === ")"){
         pos++
         column++
         tokens.push({
           type:"rightCurve",
           value:"rightCurve",
         })
       }else {
         return {
           error: `Unexpected character ${this.codes[pos]} at line ${line}:${pos}`
         }
       }
     }
     return {
       error: false,
       tokens
     }
   }
   
   compile() {
     const {
       tokens,
       error
     } = this.tokenize()
     if (error) {
       return console.log(error)
     }
     this.parseCodes(tokens);
     }
 
     parseCodes(tokens) {
         //console.log(tokens);
         const nLength = tokens.length;
         let position = 0;
         const vars = {};
         const objects = {};
         while (position < nLength) {
             let token = tokens[position];
             if(token.type === "keyword" && token.value === "printf" || token.type === "keyword" && token.value === "Say") {
                 if(tokens[position + 1] === undefined) {
                     console.error("Stub TypeError: Expected string but got null!");
                     break;
                 }
                 const isString = tokens[position + 1].type === "string";
                 if(!isString) {
                     if(!tokens[position + 1]) {
                         return console.error("Stub TypeError: Expected string but got null!");
                     }
                     return console.error("Stub TypeError: Expected string but got null!");  
                 }
                 console.log(tokens[position + 1].value);
                 position += 2;
             }
 
             if(token.type === "keyword" && token.value === "writeText") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const textToPrint = tokens[position + 1].value;
             console.log(textToPrint);
             position += 2;
             }
 
             if(token.type === "keyword" && token.value === "FindSquare") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const numberToSquare = tokens[position + 1].value;
             console.log(Number(numberToSquare) ** 2);
             position += 2;
             }
 
             if(token.type === "keyword" && token.value === "Sqrt" || token.type === "keyword" && token.value === "sqrt") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const numberToRoot = tokens[position + 1].value;
             console.log(Math.sqrt(Number(numberToRoot)));
             position += 2;
             }
 
             if(token.type === "keyword" && token.value === "FindCube") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const numberToCube = Number(tokens[position + 1].value);
             console.log(numberToCube ** 3);
             position += 2;
             }
 
             if(token.type === "keyword" && token.value === "Cbrt" || token.type === "keyword" && token.value === "cbrt") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const numberToRoot = tokens[position + 1].value;
             console.log(Math.cbrt(Number(numberToRoot)));
             position += 2;
             }
 
             if(token.type === "keyword" && token.value === "RaiseNumber") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                 break;
             }
             const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
             if(!isEq) {
                if(!tokens[position + 1]) {
                   return console.log("Stub Error: Expected promise sign '=>' but got null!");
                }
                return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
            
             if(tokens[position + 2] === undefined) {
               console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
               break;
           }
             const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
             if(!isLambda) {
               if(!tokens[position + 2]) {
                 
                 return console.log("Stub Error: Expected promise sign '=>' but got null!");
              }
              return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
             if(tokens[position + 3] === undefined) {
               return console.log("Stub Error: Expected 'Base' keyword but got null!");
           }
 
             const isBase = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Base";
             if(!isBase) {
                if(!tokens[position + 3]) {
                  return console.log("Stub Error: Expected 'Base' keyword but got null!");
                }
                return console.log("Stub Error: Expected 'Base' keyword but got null!");
             }
             if(tokens[position + 4] === undefined) {
               return console.log("Stub Error: Expected equal to sign '=' but got null!");
           }
             const isEq2 = tokens[position + 4].type === "operator" && tokens[position + 4].value === "eq";
             if(!isEq2) {
               if(!tokens[position + 4]) {
                  return console.log("Stub Error: Expected equal to sign '=' but got null!");
               }
               return console.log("Stub Error: Expected equal to sign '=' but got null!");
            }
           if(tokens[position + 5] === undefined) {
             return console.error("Stub TypeError: Expected string but got null!");
           }
            const isString = tokens[position + 5].type === "string";
             if(!isString) {
                 if(!tokens[position + 5]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const Base = Number(tokens[position + 5].value);
             if(tokens[position + 6] === undefined) {
               return console.log("Stub Error: Expected comma ',' but got null!");
             }
             const isComma = tokens[position + 6].type === "comma";
             if(!isComma) {
               if(!tokens[position + 6]) {
                 return console.log("Stub Error: Expected comma ',' but got null!");
               }
               return console.log("Stub Error: Expected comma ',' but got null!");
             }
             if(tokens[position + 7] === undefined) {
               return console.log("Stub Error: Expected 'Power' keyword but got null!");
             }
             const isPower = tokens[position + 7].type === "keyword" && tokens[position + 7].value === "Power";
             if(!isPower) {
                if(!tokens[position + 7]) {
                  return console.log("Stub Error: Expected 'Power' keyword but got null!");
                }
                return console.log("Stub Error: Expected 'Power' keyword but got null!");
             }
             if(tokens[position + 8] === undefined) {
               return console.log("Stub Error: Expected equal to sign '=' but got null!");
             }
             const isEq3 = tokens[position + 8].type === "operator" && tokens[position + 8].value === "eq";
             if(!isEq3) {
               if(!tokens[position + 8]) {
                  return console.log("Stub Error: Expected equal to sign '=' but got null!");
               }
               return console.log("Stub Error: Expected equal to sign '=' but got null!");
            }
            if(tokens[position + 9] === undefined) {
             return console.error("Stub TypeError: Expected string but got null!");
            }
            const isString2 = tokens[position + 9].type === "string";
             if(!isString2) {
                 if(!tokens[position + 9]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const Power = Number(tokens[position + 9].value);
             console.log(Base ** Power);
             position += 10;
             }
 
             if(token.type === "keyword" && token.value === "GetDate") {
                    const date = new Date();
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    console.log(day + "/" + month + "/" + year);
                    position += 1;
             }
 
             if(token.type === "keyword" && token.value === "GetTodayDay") {
                  const date = new Date();
                  console.log(date.getDate())
                  position += 1;
             }
 
             if(token.type === "keyword" && token.value === "GetDay") {
               const date = new Date();
               console.log(date.getDay());
               position += 1;
             }
             
             if(token.type === "keyword" && token.value === "GetYear") {
                const date = new Date();
                console.log(date.getFullYear());
                position += 1;
             }
             if(token.type === "keyword" && token.value === "GetDayName") {
                const date = new Date();
                const TodayDay = date.getDay();
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                console.log("Today, It is " + days[TodayDay]);
                position += 1;
             }
 
             if(token.type === "keyword" && token.value === "Version") {
                const versionStr = "1.0.0";
                console.log(versionStr);
                position += 1;
             }
 
             if(token.type === "keyword" && token.value === "UserInput") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                 break;
             }
             const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
             if(!isEq) {
                if(!tokens[position + 1]) {
                   return console.log("Stub Error: Expected promise sign '=>' but got null!");
                }
                return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
            
             if(tokens[position + 2] === undefined) {
               console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
               break;
           }
             const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
             if(!isLambda) {
               if(!tokens[position + 2]) {
                 
                 return console.log("Stub Error: Expected promise sign '=>' but got null!");
              }
              return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
             if(tokens[position + 3] === undefined) {
               return console.log("Stub Error: Expected 'Message' keyword but got null!");
           }
           const isMessage = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Message";
           if(!isMessage) {
              if(!tokens[position + 3]) {
               return console.log("Stub Error: Expected 'Message' keyword but got null!");
              }
              return console.log("Stub Parsing Error: Expected 'Message' keyword but got null!");
           }
           if(tokens[position + 4] === undefined) {
             return console.log("Stub Parsing Error: Expected equal to sign '=' but got null!");
         }
           const isEq2 = tokens[position + 4].type === "operator" && tokens[position + 4].value === "eq";
           if(!isEq2) {
             if(!tokens[position + 4]) {
                return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
             }
             return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
          }
          
         if(tokens[position + 5] === undefined) {
           return console.error("Stub TypeError: Expected string but got null!");
         }
          const isString = tokens[position + 5].type === "string";
           if(!isString) {
               if(!tokens[position + 5]) {
                   return console.error("Stub TypeError: Expected string but got null!");
               }
               return console.error("Stub TypeError: Expected string but got null!");  
           }
           const UserMessage = tokens[position + 5].value;
           if(tokens[position + 6] === undefined) {
             return console.log("Stub ParsingError: Expected comma ',' but got null!");
           }
            const isComma = tokens[position + 6].type === "comma";
               if(!isComma) {
                 if(!tokens[position + 6]) {
                   return console.log("Stub Error: Expected comma ',' but got null!");
                 }
                 return console.log("Stub Error: Expected comma ',' but got null!");
               }
           if(tokens[position + 7] === undefined) {
             return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
           }
           const isVar = tokens[position + 7].type === "keyword" && tokens[position + 7].value === "Variable";
           if(!isVar) {
              if(!tokens[position + 7]) {
               return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
              }
              return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
           }
           if(tokens[position + 8] === undefined) {
             return console.log("Stub Parsing Error: Expected equal to sign '=' but got null!");
         }
         const isEq23 = tokens[position + 8].type === "operator" && tokens[position + 8].value === "eq";
           if(!isEq23) {
             if(!tokens[position + 8]) {
                return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
             }
             return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
          }
          if(tokens[position + 9] === undefined) {
           return console.log("Stub Parsing Error: Expected variable name in string but got null!");
       }
       const isString2 = tokens[position + 9].type === "string";
           if(!isString2) {
               if(!tokens[position + 9]) {
                 return console.log("Stub Parsing Error: Expected variable name in string but got null!");
               }
               return console.log("Stub Parsing Error: Expected variable name in string but got null!");
           }
           const VarName = tokens[position + 9].value;
           var rld = readline.createInterface(
             process.stdin, process.stdout);
             
 rl.question(UserMessage + "\n", (Resp) => {
   store.set('Variables', { [VarName]:Resp });
   rl.close();
 });
       
       position += 10;    
             }
 
             if(token.type === "keyword" && token.value === "PrintVar" || token.type === "keyword" && token.value === "WriteVar") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const varName = tokens[position + 1].value;
             console.log(store.get('Variables')[varName]);  
             }
 
             if(token.type === "keyword" && token.value === "LoopWrite") {
               const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
               if(!isEq) {
                  if(!tokens[position + 1]) {
                     return console.log("Stub Error: Expected promise sign '=>' but got null!");
                  }
                  return console.log("Stub Error: Expected promise sign '=>' but got null!");
               }
              
               if(tokens[position + 2] === undefined) {
                 console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                 break;
             }
 
               const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
               if(!isLambda) {
                 if(!tokens[position + 2]) {
                   return console.log("Stub Error: Expected promise sign '=>' but got null!");
                }
                return console.log("Stub Error: Expected promise sign '=>' but got null!");
               }
               if(tokens[position + 3] === undefined) {
                 return console.log("Stub Error: Expected string but got null!");
               
             }
             const isString = tokens[position + 3].type === "string";
             if(!isString) {
                if(!tokens[position + 3]) {
                 return console.log("Stub Error: Expected string but got null!");
                }
                return console.log("Stub Error: Expected string but got null!");
             }
 
             const numberOfTimes = Number(tokens[position + 3].value);
             if(tokens[position + 4] === undefined) {
               return console.log("Stub Error: Expected string but got null!");
             
           }
           const isString4 = tokens[position + 4].type === "string";
           if(!isString4) {
              if(!tokens[position + 4]) {
               return console.log("Stub Error: Expected string but got null!");
              }
              return console.log("Stub Error: Expected string but got null!");
           }
           const message = tokens[position + 4].value;
           for(let x = 0; x <= numberOfTimes - 1; x++) {
              console.log(message);
           }
           position += 5;
             }
 
             if(token.type === "keyword" && token.value === "GetSystemVar") {
               if(tokens[position + 1] === undefined) {
                 console.error("Stub TypeError: Expected string but got null!");
                 break;
             }
             const isString = tokens[position + 1].type === "string";
             if(!isString) {
                 if(!tokens[position + 1]) {
                     return console.error("Stub TypeError: Expected string but got null!");
                 }
                 return console.error("Stub TypeError: Expected string but got null!");  
             }
             const VariableName = tokens[position + 1].value;
             if(VariableName === "Stub.Math.PI") {
               const PI = 3.14159; 
               console.log(PI);
               
             }
             position += 1
             }
 
             if(token.type === "keyword" && token.value === "import") {
                 if(tokens[position + 1] === undefined) {
                     console.error("Stub TypeError: Expected string but got null!");
                     break;
                 }
                 const isString = tokens[position + 1].type === "string";
                 if(!isString) {
                     if(!tokens[position + 1]) {
                         return console.error("Stub TypeError: Expected string but got null!");
                     }
                     return console.error("Stub TypeError: Expected string but got null!");  
                 }
 
                 const moduleName = tokens[position + 1].value;
                 if(moduleName === "iostream") {
                      const defMod = "stub.lang.iostream";
                      const path = "stub" + "/" + "lang" + "/" + "iostream.stub";
                      fs.readFile(path,
     function(err, data) {       
         if (err) return console.error(err);
         const {
             tokens,
             error
           } = new stubCompiler(data, fileName).tokenize();
           if (error) {
             return console.log(error)
           }
           
     });
     
                 }
             }
             if(token.type === "keyword" && token.value === "throw") {
                 if(tokes[position + 1] === undefined) {
                   return console.error("Stub Error: Expected a string after the throw keyword");
                 }
             } 
         }
     }
   }
     
askCommand();
async function askCommand() {
  let userName;
  const allFilesContent1 = fs.readFileSync("system/VARIABLES/" + "username.stubvm.var", (err) => {
    if(err) console.log("StubVM: Unable to start the VM! Make sure that the environment is properly set-up and try again!");
});
String(allFilesContent1).split(/\r?\n/).forEach(text =>  {
    userName = text;
});  
    const rawCommand = readline.question(`${userName}@stub $ `);
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
  if(arguments[0] === "clear" || arguments[0] === "cls" || arguments[0] === "wash") {
     console.clear();
  }
  
  if(arguments[0] === "stub") {
    const fileName = arguments[1];

let keywords = [
   "printf",
   "import",
   "newKeyword",
   "writeText",
   "FindSquare",
   "Sqrt",
   "sqrt",
   "FindCube",
   "Cbrt",
   "cbrt",
   "RaiseNumber",
   "Base",
   "Power",
   "UserInput",
   "GetDate",
   "GetTodayDay",
   "GetDay",
   "GetDayName",
   "Say",
   "Version",
   "Find",
   "Message",
   "Variable",
   "PrintVar",
   "WriteVar",
   "PrintInVar",
   "LoopWrite",
   "NewFile",
   "as",
   "CreateFile",
   "endl",
   "GetYear",
   "AddNumbers",
   "GetSystemVar"
];
class stubCompiler {
  constructor(codes, fileName) {
    this.codes = codes;
    this.fileName = fileName;
  }
  tokenize() {
    const length = this.codes.length
    let pos = 0
    let line = 1;
    let column = 0;
    let tokens = []
    let BUILT_IN_KEYWORDS = keywords;
    const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_()#N;{}1234567890'
    while (pos < length) {
      let currentChar = this.codes[pos]
      if (currentChar === " ") {
        pos++
        column++
        continue
      }else if(currentChar === "\n"){
          column = 0;
          pos++
          continue
      } else if (currentChar === '"') {
        let res = ""
        pos++
        column++
        while (this.codes[pos] !== '"' && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (this.codes[pos] !== '"') {
          return {
            error: `Incomplete String at line ${line}:${pos}`
          }
        }
        pos++
        tokens.push({
          type: "string",
          value: res
        })
      } else if (currentChar === "'") {
        let res = ""
        pos++
        while (this.codes[pos] !== "'" && this.codes[pos] !== '\n' && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (this.codes[pos] !== "'") {
          return {
            error: `Incomplete String at line ${line}:${pos}!`
          }
        }
        pos++
        tokens.push({
          type: "string",
          value: res
        })
      }
      else if (varChars.includes(currentChar)) {
        let res = currentChar
        pos++
        while (varChars.includes(this.codes[pos]) && pos < length) {
          res += this.codes[pos]
          pos++
        }
        if (!BUILT_IN_KEYWORDS.includes(res)) {
          return {
            error: `Stub Token Error:- Unexpected token ${res}. ${res} is not defined!`
          }
        }
        tokens.push({
          type: BUILT_IN_KEYWORDS.includes(res) ? "keyword" : "keyword_custom",
          value: res
        })
      }else if (currentChar === '='){
        pos++
        column++
        tokens.push({
          type: "operator",
          value: "eq"
        })
      }else if(currentChar === "+"){
        pos++
        column++
        tokens.push({
          type:"operator",
          value:"plus"
        })
      }else if (currentChar === '/'){
       pos++
       column++
       tokens.push({
        type: "operator",
        value: "comment"
      })
      }else if(currentChar === ":"){
        pos++
        column++
        tokens.push({
          type:"colon",
          value:"colon"
        })
      }else if(currentChar === ">"){
        pos++
        column++
        tokens.push({
          type:"lambda",
          value:"lambda",
        })
      }else if(currentChar === ","){
        pos++
        column++
        tokens.push({
          type:"comma",
          value:"comma",
        })
      }else if(currentChar === "("){
        pos++
        column++
        tokens.push({
          type:"leftCurve",
          value:"leftCurve",
        })
      }else if(currentChar === ")"){
        pos++
        column++
        tokens.push({
          type:"rightCurve",
          value:"rightCurve",
        })
      }else {
        return {
          error: `Unexpected character ${this.codes[pos]} at line ${line}:${pos}`
        }
      }
    }
    return {
      error: false,
      tokens
    }
  }
  
  compile() {
    const {
      tokens,
      error
    } = this.tokenize()
    if (error) {
      return console.log(error)
    }
    this.parseCodes(tokens);
    }

    parseCodes(tokens) {
        //console.log(tokens);
        const nLength = tokens.length;
        let position = 0;
        const vars = {};
        const objects = {};
        while (position < nLength) {
            let token = tokens[position];
            if(token.type === "keyword" && token.value === "printf" || token.type === "keyword" && token.value === "Say") {
                if(tokens[position + 1] === undefined) {
                    console.error("Stub TypeError: Expected string but got null!");
                    break;
                }
                const isString = tokens[position + 1].type === "string";
                if(!isString) {
                    if(!tokens[position + 1]) {
                        return console.error("Stub TypeError: Expected string but got null!");
                    }
                    return console.error("Stub TypeError: Expected string but got null!");  
                }
                console.log(tokens[position + 1].value);
                position += 2;
            }

            if(token.type === "keyword" && token.value === "writeText") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const textToPrint = tokens[position + 1].value;
            console.log(textToPrint);
            position += 2;
            }

            if(token.type === "keyword" && token.value === "FindSquare") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const numberToSquare = tokens[position + 1].value;
            console.log(Number(numberToSquare) ** 2);
            position += 2;
            }

            if(token.type === "keyword" && token.value === "Sqrt" || token.type === "keyword" && token.value === "sqrt") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const numberToRoot = tokens[position + 1].value;
            console.log(Math.sqrt(Number(numberToRoot)));
            position += 2;
            }

            if(token.type === "keyword" && token.value === "FindCube") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const numberToCube = Number(tokens[position + 1].value);
            console.log(numberToCube ** 3);
            position += 2;
            }

            if(token.type === "keyword" && token.value === "Cbrt" || token.type === "keyword" && token.value === "cbrt") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const numberToRoot = tokens[position + 1].value;
            console.log(Math.cbrt(Number(numberToRoot)));
            position += 2;
            }

            if(token.type === "keyword" && token.value === "RaiseNumber") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                break;
            }
            const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
            if(!isEq) {
               if(!tokens[position + 1]) {
                  return console.log("Stub Error: Expected promise sign '=>' but got null!");
               }
               return console.log("Stub Error: Expected promise sign '=>' but got null!");
            }
           
            if(tokens[position + 2] === undefined) {
              console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
              break;
          }
            const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
            if(!isLambda) {
              if(!tokens[position + 2]) {
                
                return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
             return console.log("Stub Error: Expected promise sign '=>' but got null!");
            }
            if(tokens[position + 3] === undefined) {
              return console.log("Stub Error: Expected 'Base' keyword but got null!");
          }

            const isBase = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Base";
            if(!isBase) {
               if(!tokens[position + 3]) {
                 return console.log("Stub Error: Expected 'Base' keyword but got null!");
               }
               return console.log("Stub Error: Expected 'Base' keyword but got null!");
            }
            if(tokens[position + 4] === undefined) {
              return console.log("Stub Error: Expected equal to sign '=' but got null!");
          }
            const isEq2 = tokens[position + 4].type === "operator" && tokens[position + 4].value === "eq";
            if(!isEq2) {
              if(!tokens[position + 4]) {
                 return console.log("Stub Error: Expected equal to sign '=' but got null!");
              }
              return console.log("Stub Error: Expected equal to sign '=' but got null!");
           }
          if(tokens[position + 5] === undefined) {
            return console.error("Stub TypeError: Expected string but got null!");
          }
           const isString = tokens[position + 5].type === "string";
            if(!isString) {
                if(!tokens[position + 5]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const Base = Number(tokens[position + 5].value);
            if(tokens[position + 6] === undefined) {
              return console.log("Stub Error: Expected comma ',' but got null!");
            }
            const isComma = tokens[position + 6].type === "comma";
            if(!isComma) {
              if(!tokens[position + 6]) {
                return console.log("Stub Error: Expected comma ',' but got null!");
              }
              return console.log("Stub Error: Expected comma ',' but got null!");
            }
            if(tokens[position + 7] === undefined) {
              return console.log("Stub Error: Expected 'Power' keyword but got null!");
            }
            const isPower = tokens[position + 7].type === "keyword" && tokens[position + 7].value === "Power";
            if(!isPower) {
               if(!tokens[position + 7]) {
                 return console.log("Stub Error: Expected 'Power' keyword but got null!");
               }
               return console.log("Stub Error: Expected 'Power' keyword but got null!");
            }
            if(tokens[position + 8] === undefined) {
              return console.log("Stub Error: Expected equal to sign '=' but got null!");
            }
            const isEq3 = tokens[position + 8].type === "operator" && tokens[position + 8].value === "eq";
            if(!isEq3) {
              if(!tokens[position + 8]) {
                 return console.log("Stub Error: Expected equal to sign '=' but got null!");
              }
              return console.log("Stub Error: Expected equal to sign '=' but got null!");
           }
           if(tokens[position + 9] === undefined) {
            return console.error("Stub TypeError: Expected string but got null!");
           }
           const isString2 = tokens[position + 9].type === "string";
            if(!isString2) {
                if(!tokens[position + 9]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const Power = Number(tokens[position + 9].value);
            console.log(Base ** Power);
            position += 10;
            }

            if(token.type === "keyword" && token.value === "GetDate") {
                   const date = new Date();
                   const day = date.getDate();
                   const month = date.getMonth() + 1;
                   const year = date.getFullYear();
                   console.log(day + "/" + month + "/" + year);
                   position += 1;
            }

            if(token.type === "keyword" && token.value === "GetTodayDay") {
                 const date = new Date();
                 console.log(date.getDate())
                 position += 1;
            }

            if(token.type === "keyword" && token.value === "GetDay") {
              const date = new Date();
              console.log(date.getDay());
              position += 1;
            }
            
            if(token.type === "keyword" && token.value === "GetYear") {
               const date = new Date();
               console.log(date.getFullYear());
               position += 1;
            }
            if(token.type === "keyword" && token.value === "GetDayName") {
               const date = new Date();
               const TodayDay = date.getDay();
               const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
               console.log(days[TodayDay]);
               position += 1;
            }

            if(token.type === "keyword" && token.value === "Version") {
               const versionStr = "1.0.0";
               console.log(versionStr);
               position += 1;
            }

            if(token.type === "keyword" && token.value === "UserInput") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                break;
            }
            const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
            if(!isEq) {
               if(!tokens[position + 1]) {
                  return console.log("Stub Error: Expected promise sign '=>' but got null!");
               }
               return console.log("Stub Error: Expected promise sign '=>' but got null!");
            }
           
            if(tokens[position + 2] === undefined) {
              console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
              break;
          }
            const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
            if(!isLambda) {
              if(!tokens[position + 2]) {
                
                return console.log("Stub Error: Expected promise sign '=>' but got null!");
             }
             return console.log("Stub Error: Expected promise sign '=>' but got null!");
            }
            if(tokens[position + 3] === undefined) {
              return console.log("Stub Error: Expected 'Message' keyword but got null!");
          }
          const isMessage = tokens[position + 3].type === "keyword" && tokens[position + 3].value === "Message";
          if(!isMessage) {
             if(!tokens[position + 3]) {
              return console.log("Stub Error: Expected 'Message' keyword but got null!");
             }
             return console.log("Stub Parsing Error: Expected 'Message' keyword but got null!");
          }
          if(tokens[position + 4] === undefined) {
            return console.log("Stub Parsing Error: Expected equal to sign '=' but got null!");
        }
          const isEq2 = tokens[position + 4].type === "operator" && tokens[position + 4].value === "eq";
          if(!isEq2) {
            if(!tokens[position + 4]) {
               return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
            }
            return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
         }
         
        if(tokens[position + 5] === undefined) {
          return console.error("Stub TypeError: Expected string but got null!");
        }
         const isString = tokens[position + 5].type === "string";
          if(!isString) {
              if(!tokens[position + 5]) {
                  return console.error("Stub TypeError: Expected string but got null!");
              }
              return console.error("Stub TypeError: Expected string but got null!");  
          }
          const UserMessage = tokens[position + 5].value;
          if(tokens[position + 6] === undefined) {
            return console.log("Stub ParsingError: Expected comma ',' but got null!");
          }
           const isComma = tokens[position + 6].type === "comma";
              if(!isComma) {
                if(!tokens[position + 6]) {
                  return console.log("Stub Error: Expected comma ',' but got null!");
                }
                return console.log("Stub Error: Expected comma ',' but got null!");
              }
          if(tokens[position + 7] === undefined) {
            return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
          }
          const isVar = tokens[position + 7].type === "keyword" && tokens[position + 7].value === "Variable";
          if(!isVar) {
             if(!tokens[position + 7]) {
              return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
             }
             return console.error("Stub TypeError: Expected 'Variable' keyword but got null!");
          }
          if(tokens[position + 8] === undefined) {
            return console.log("Stub Parsing Error: Expected equal to sign '=' but got null!");
        }
        const isEq23 = tokens[position + 8].type === "operator" && tokens[position + 8].value === "eq";
          if(!isEq23) {
            if(!tokens[position + 8]) {
               return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
            }
            return console.log("Stub TypeError: Expected equal to sign '=' but got null!");
         }
         if(tokens[position + 9] === undefined) {
          return console.log("Stub Parsing Error: Expected variable name in string but got null!");
      }
      const isString2 = tokens[position + 9].type === "string";
          if(!isString2) {
              if(!tokens[position + 9]) {
                return console.log("Stub Parsing Error: Expected variable name in string but got null!");
              }
              return console.log("Stub Parsing Error: Expected variable name in string but got null!");
          }
          const VarName = tokens[position + 9].value;
          var rl = readline.createInterface(
            process.stdin, process.stdout);
            
rl.question(UserMessage + "\n", (Resp) => {
  store.set('Variables', { [VarName]:Resp });
  rl.close();
});
      
      position += 10;    
            }

            if(token.type === "keyword" && token.value === "PrintVar" || token.type === "keyword" && token.value === "WriteVar") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const varName = tokens[position + 1].value;
            console.log(store.get('Variables')[varName]);  
            }

            if(token.type === "keyword" && token.value === "LoopWrite") {
              const isEq = tokens[position + 1].type = "operator" && tokens[position + 1].value === "eq";
              if(!isEq) {
                 if(!tokens[position + 1]) {
                    return console.log("Stub Error: Expected promise sign '=>' but got null!");
                 }
                 return console.log("Stub Error: Expected promise sign '=>' but got null!");
              }
             
              if(tokens[position + 2] === undefined) {
                console.error("Stub TypeError: Expected PromiseSign '=>' but got null!");
                break;
            }

              const isLambda = tokens[position + 2].type === "lambda" && tokens[position + 2].value === "lambda";
              if(!isLambda) {
                if(!tokens[position + 2]) {
                  return console.log("Stub Error: Expected promise sign '=>' but got null!");
               }
               return console.log("Stub Error: Expected promise sign '=>' but got null!");
              }
              if(tokens[position + 3] === undefined) {
                return console.log("Stub Error: Expected string but got null!");
              
            }
            const isString = tokens[position + 3].type === "string";
            if(!isString) {
               if(!tokens[position + 3]) {
                return console.log("Stub Error: Expected string but got null!");
               }
               return console.log("Stub Error: Expected string but got null!");
            }

            const numberOfTimes = Number(tokens[position + 3].value);
            if(tokens[position + 4] === undefined) {
              return console.log("Stub Error: Expected string but got null!");
            
          }
          const isString4 = tokens[position + 4].type === "string";
          if(!isString4) {
             if(!tokens[position + 4]) {
              return console.log("Stub Error: Expected string but got null!");
             }
             return console.log("Stub Error: Expected string but got null!");
          }
          const message = tokens[position + 4].value;
          for(let x = 0; x <= numberOfTimes - 1; x++) {
             console.log(message);
          }
          position += 5;
            }

            if(token.type === "keyword" && token.value === "GetSystemVar") {
              if(tokens[position + 1] === undefined) {
                console.error("Stub TypeError: Expected string but got null!");
                break;
            }
            const isString = tokens[position + 1].type === "string";
            if(!isString) {
                if(!tokens[position + 1]) {
                    return console.error("Stub TypeError: Expected string but got null!");
                }
                return console.error("Stub TypeError: Expected string but got null!");  
            }
            const VariableName = tokens[position + 1].value;
            if(VariableName === "Stub.Math.PI") {
              const PI = 3.14159; 
              console.log(PI);
              
            }
            position += 1
            }

            if(token.type === "keyword" && token.value === "import") {
                if(tokens[position + 1] === undefined) {
                    console.error("Stub TypeError: Expected string but got null!");
                    break;
                }
                const isString = tokens[position + 1].type === "string";
                if(!isString) {
                    if(!tokens[position + 1]) {
                        return console.error("Stub TypeError: Expected string but got null!");
                    }
                    return console.error("Stub TypeError: Expected string but got null!");  
                }

                const moduleName = tokens[position + 1].value;
                if(moduleName === "iostream") {
                     const defMod = "stub.lang.iostream";
                     const path = "stub" + "/" + "lang" + "/" + "iostream.stub";
                     fs.readFile(path,
    function(err, data) {       
        if (err) return console.error(err);
        const {
            tokens,
            error
          } = new stubCompiler(data, fileName).tokenize();
          if (error) {
            return console.log(error)
          }
          
    });
    
                }
            }
            if(token.type === "keyword" && token.value === "throw") {
                if(tokes[position + 1] === undefined) {
                  return console.error("Stub Error: Expected a string after the throw keyword");
                }
            } 
        }
    }
  }
  const allFileContents = fs.readFileSync(fileName + ".stub", 'utf8');
allFileContents.split(/\r?\n/).forEach(codes =>  {
  new stubCompiler(codes, fileName).compile();
});  
  }
  if(arguments[0] === "mkdir") {
     console.log(arguments[1]);
  }
  if(arguments[0] === "author") {
     console.log("Welcome to Stub-VM!");
     console.log("The Stub-VM is designed and created by Namish Kumar, a student of class " + meClass + " . It implements StubOS 1.0.0 in an Virtual Environment.");
  }

  if(arguments[0] === "restart") {
    let exec = require('child_process').exec;
    console.clear();
    exec(`npm stop --if-present && npm start`, (error, stdout, stderr) => {
        if(error) console.log("Unable to restart the Stub-VM!");
        console.clear();
    });
  }

  if(arguments[0] === "ls") {
      
  }
  if(arguments[0] === "notepote") {
     const d = readline.question("Welcome to Notpote 1.0.0! Please choose the required option to continue\n1. To create a note\n2. To open an existing note\n 3. To delete a note\nPlease enter here: ");
     if(d === "1") {
        raskName();
        function raskName() {
          const askName = readline.question("Alright! Please enter the name of the note that you would like to save\n Please enter here: ");
          if(askName.length < 1) {
             raskName();
          }else{
             const noteText = readline.question("Alright! Please start typing your note from below\n__________________\n");
             if(noteText) {
              //console.log(noteText);
              fs.writeFileSync("system/NOTES/" + askName + ".stubvm.note", noteText.toString(), (err) => {
                if (err) {
                  console.log("Unable to write or create a note file! StubVM Error code 402");
                 }
                   console.log("Successfully created your note! You can view it using notepote!");
              });
             }
             
          }
        }
     }else if(d === "2") {
      askN();
        function askN() {
             const askName = readline.question("Please enter the name of the note to view\nEnter here:- ");
             if(askName.length < 0 || askName === "") {
                console.log("Invalid Note! There is no such note!");
             }else{
              const allFilesContent = fs.readFileSync("system/NOTES/" + askName + ".stubvm.note", (err) => {
                  if(err) console.log("StubVM: There is no such note! Please check whether the note exists and then try again!");
              });
              String(allFilesContent).split(/\r?\n/).forEach(text =>  {
                  console.log("\n___________________\n");
                  console.log(text);
              });  
             }
        }
     }else if(d === "3") {
       askN();
         function askN() {
            const askName = readline.question("Please enter the name of the note that you want to delete:- ");
            if(askName.length < 0 || askName === "") {
              console.log("Invalid Note! There is no such note!");
           }else{
              fs.unlinkSync("system/NOTES/" + askName + ".stubvm.note");
           }
         }
     }
  }
  /*if(arguments[0] === "create-environment") {
     console.log("Welcome to Stub-VM! Please wait while the environment is created...");
     console.log("\nCreating Stub-VM environment requires an Internet connection...");
     console.log("\nDownloading files from the internet...");
     const exec = require("child_process").exec;
     
  }*/
  if(arguments[0] === "day-name") {
    CompileCodes(`
      GetDayName
    `);
  }
  if(arguments[0] === "month-name") {
     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     const monthName = months[((new Date().getMonth()) + 0)]
     console.log("The name of the month is " + monthName);
  }
  if(arguments[0] === "date") {
     const date = new Date();
     const dateInString = String(date.getDate()) + "/" + String((date.getMonth() + 1)) + "/" + String(date.getFullYear());
     console.log("The date is " + dateInString);
  }
  if(arguments[0] === "pow") {
    const base = Number(arguments[1]);
    const expo = Number(arguments[2]);
    CompileCodes(`
         RaiseNumber => Base = "${base}" , Power = "${expo}"
    `);
 }
 if(arguments[0] === "sqrt") {
    const num = Number(arguments[1]);
    CompileCodes(
      `
        sqrt "${num}"
      `
    );
 }
 if(arguments[0] === "stub-site") {
  askOptions();
    function askOptions() {
      const options = readline.question("Welcome to Stub-Sites browser 1.0.0! Please choose the correct option\n1. To open a site\n2. To create a site\n3. To close this browser");
    if(options.length < 1 || options === ""){
       console.error("\nSorry! Invalid response received! Please try again!");
       askOptions();
    }
    if(options !== "1" || options !== "2" || options !== "3") {
      console.error("\nSorry! Invalid response received! Please try again!");
       askOptions();
    }
    if(options === "3") {
       process.exit(0);
    }
    if(options === "2") {
      askName();
       function askName() {
           const siteName = readline.question("\nAlright! Please enter the name of the stub-site that you would like to create:- ");
           if(siteName.length < 1 || siteName === "") {
              console.error("\nSorry, Invalid response received! Please try again!");
           }
           
       }
    }
    }
 }
 if(arguments[0] === "set-name") {
    askUserName();
    function askUserName() {
       const userName = readline.question("Welcome to StubVM 1.0.0! Please enter your name so that it is easy for you to enjoy Stub Services:- ");
       if(userName.length < 1 || userName === "") {
          console.error("\nSorry, Invalid Response received! Please try again!")
       }
       if(userName) {
        fs.writeFileSync("system/VARIABLES/" + "username.stubvm.var", userName.toString(), (err) => {
          if (err) {
            console.log("Unable to write or create a variable file! StubVM Error code 402");
           }
             console.log("Successfully saved your name!");
        });
       }
    }
 }
 if(arguments[0] === "guessy") {
    askDifficultyLevel();
    function askDifficultyLevel() {
       const difficultyLevel = null;
       // TODO
    }
 }
 if(arguments[0] === "eval") {
    const evalTo = arguments[1];
    console.log(eval(evalTo));
 }
if(arguments[0] === "filedexter") {
    let applicableWordsAfterArgument = 
    [
      "create",
      "delete",
      "edit",
      "size",
    ];
    if(!applicableWordsAfterArgument.includes(arguments[1])) {
       console.error(`FileDexter Argument Error: '${arguments[1]}' is not defined as a valid argument in FileDexter 1.0.0! Please go to https://stub.namishkumar.in/system/filedexter.html for more information regarding this.`)
    }
 } 
 if(arguments[0] === "get") {
    
 }
 if(arguments[0] === "pi") {
    console.log(Math.PI)
 }

    await askCommand();
}

function CompileFile(fileName) {
    const allFileContents = fs.readFileSync(fileName + ".stub", 'utf8');
allFileContents.split(/\r?\n/).forEach(codes =>  {
  new stubCompiler(codes, fileName).compile();
});
}
function CompileCodes(codes) {
  new stubCompiler(codes, "system" + "/ref-file").compile();
}
// Made by Namish Kumar in January 2023
// Last modified on 14 January 2023