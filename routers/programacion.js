const express = require("express");
const {programming} = require("../datos/cursos.js").cursos;

// router
const routerProgramacion = express.Router();


// todas las posibles rutuas con sus respectivos routers

routerProgramacion.get("/", (req, res) => {
    const {ordenar} = req.query;
    let cursosProgramacion;
    if (ordenar == "vistas"){
      cursosProgramacion = programming.sort((a, b) => b.vistas - a.vistas);
    }
    else if (ordenar == "vistas-reverse"){
      cursosProgramacion = programming.sort((a, b) => b.vistas - a.vistas);
      cursosProgramacion.reverse();
    }
  
    cursosProgramacion = JSON.stringify(programming);
    return res.send(cursosProgramacion);
  });
  
// empleando parametros de busqueda pora optimizar el codigo. El return de la ulatima linea de codigo es unicamente par aque pare la ejecucion de la funcion pasada como argumento al metodo.
  
routerProgramacion.get("/:language", (req, res) => {
let language = req.params.language;
let cursoProgramacion = programming.filter(curso => curso.language === language);
if (cursoProgramacion.length === 0){
    return res.status(404).send(`${res.statusCode}: No se ha encontrado nada en ${req.url}`);
}
cursoProgramacion = JSON.stringify(cursoProgramacion);
res.send(cursoProgramacion);
});

  
routerProgramacion.get("/:language/:level", (req, res) => {
const language = req.params.language;
const level = req.params.level;

let cursoProgramacion = programming.filter(curso => {
    if (language != "*"){
    return curso.language == language && curso.level == level
    }
    return curso.level == level
});

if (cursoProgramacion.length == 0){
    if (language != "*"){
    return res.status(404).send(`${res.statusCode}: No se han encontrado cursos de ${language} de nivel ${level}`);
    }
    return res.status(404).send(`${res.statusCode}: No se han encontrado cursos de nivel ${level}`); 
}

return res.send(JSON.stringify(cursoProgramacion));
})


// exportaciones
module.exports = routerProgramacion;