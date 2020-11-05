const fs = require("fs");
var lineReader = require("line-reader");

function pasada1() {
  console.log("ok")
  let contents = fs.readFileSync("parsear", "utf8");
  contents = contents.toLowerCase();

  lineReader.eachLine("stopws2", (line, last) => {
    var regex = new RegExp("\\b" + line + "\\b", "g");
    contents = contents.replace(regex, "");
    if (last) {
      fs.writeFile("salida", contents, err => {
        if (err) console.log(err);
        console.log("okey se creo");
      });
    }
  });
}

function pasada2() {
  let contents = fs.readFileSync("salida", "utf8");
  contents = contents.toLowerCase();
  var is = new RegExp("'s", "g");
  var point = new RegExp("\\.", "g");
  var coma = new RegExp(",", "g");
  var pregunta = new RegExp("\\?", "g");
  var comilla = new RegExp("'", "g");
  var backtick = new RegExp("`", "g");
  var not = new RegExp("n't", "g");
  var are = new RegExp("'re", "g");
  var will = new RegExp("'ll", "g");
  var have = new RegExp("'ve", "g");
  var had = new RegExp("'d", "g");
  var not2 = new RegExp("'t", "g");
  var them = new RegExp("'em", "g");

  contents = contents.replace(is, "is");
  contents = contents.replace(not, "not");
  contents = contents.replace(are, "are");
  contents = contents.replace(will, "will");
  contents = contents.replace(have, "have");
  contents = contents.replace(had, "had");
  contents = contents.replace(not2, "not");
  contents = contents.replace(them, "them");

  contents = contents.replace(point, "");
  contents = contents.replace(coma, "");
  contents = contents.replace(pregunta, "");
  contents = contents.replace(comilla, "");
  contents = contents.replace(backtick, "");

  fs.writeFile("salida2", contents, err => {
    if (err) console.log(err);
    console.log("okey se creo");
  });
}

function pasada3() {
  let contents = fs.readFileSync("salida2", "utf8");
  //let lemas = fs.readFileSync("Preguntas_filtradas", "utf8");

  lineReader.eachLine("stopws2", (line, last) => {
    var regex = new RegExp("\\b" + line + "\\b", "g");
    contents = contents.replace(regex, "");
    if (last) {
      fs.writeFile("salida", contents, err => {
        if (err) console.log(err);
        console.log("okey se creo");
      });
    }
  });
}

function pasada4() {
  const getlinea = require("./util/getLine");

  let i = 0;
  let nuevoTexto = "";
  lineReader.eachLine("Preguntas_filtradas", (line, last) => {
    lineaFile = getlinea(i, "salida2");
    lineaClass = line.substring(0, line.indexOf(" ")).split(":");
    lineaClass1 = lineaClass[0];
    lineaClass2 = lineaClass[1];
    nuevoTexto = `${nuevoTexto} '${lineaFile}' , ${lineaClass1}, ${lineaClass2}
        `;
    if (last) {
      fs.writeFile("salida3", nuevoTexto, err => {
        if (err) console.log(err);
        console.log("okey se creo");
      });
    }
    i++;
  });
}

function gramas() {

  let completo = "";

  lineReader.eachLine("salida3", (line, last) => {
    let linea = line.split(",");
    var comilla = new RegExp("'", "g");
    let palabras;
    //console.log(linea)
    linea[0] = linea[0].replace(comilla, "");
    linea = linea.map(e => e.trim())

    palabras = linea[0].split(" ");
    if (palabras.length >= 3) {
        completo = `${completo} '${palabras[0]}'`;
        completo = `${completo},'${palabras[1]}', '${palabras[0]} ${palabras[1]}' `;
        completo = `${completo},'${palabras[2]}','${palabras[1]} ${palabras[2]}','${palabras[0]} ${palabras[2]}'`;
      completo = `${completo} ,${linea[1]},${linea[2]} \n`;
    }

    if (last) {
      fs.writeFile("gramas", completo, err => {
        if (err) console.log(err);
        console.log("okey se creo");
      });
    }
  });
}
//pasada1();
//pasada2();
//pasada3();
//pasada4();
gramas();
