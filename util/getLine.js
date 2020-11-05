//var lineReader = require("line-reader");
const fs = require("fs");



function getLinea(numeroLinea, file){
    let contents = fs.readFileSync(file, "utf8");
    contents = contents.split("\r\n");
    return contents[numeroLinea];

    

   /*  var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
      });
      
    lineReader.on('line',  (line) => {
        console.log(i)
        if(i == numeroLinea){
            //Sconsole.log("hola mundo")
            return line
        }
        i = i + 1; 
      }); */

}
module.exports = getLinea;