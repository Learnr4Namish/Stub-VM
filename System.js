const fs = require("fs");
const System = {
    // Writes to a file
    writeFile: function writeFile(path, data, cb) {
        //fs.mkdir(path, { recursive: true}, function (err) {
          //if (err) return cb(err);
          fs.writeFile(path, data, (err) => {
            if (err) {
              console.log("Unable to write to a file. StubVM Error code 402");
             }else {
               
            }
          });
        //});
      },
    // Logs a text in the console
    writeText: function writeText(Object) {
        console.log(Object);
    }  
}
module.exports = System;  