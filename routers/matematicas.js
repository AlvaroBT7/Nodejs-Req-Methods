const express = require("express");
const {matematicas} = require("../datos/cursos.js").cursos;

// router
const routerMatematicas = express.Router();

routerMatematicas.use(express.json());


// todas las posibles rutuas con sus respectivos routers

routerMatematicas.get("/", (req, res) => {
  let cursosMatematicas = JSON.stringify(matematicas);
  res.send(cursosMatematicas);
});
  
routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  let cursoMatematicas = matematicas.filter(curso => curso.tema == tema);
  if (cursoMatematicas.length === 0){
    return res.status(404).send(`${res.statusCode}: No se ha encontrado nada en ${req.url}`);
  }
  cursoMatematicas = JSON.stringify(cursoMatematicas);
  res.send(cursoMatematicas);
});
  
routerMatematicas.get("/:tema/:nivel", (req, res) => {
const {tema} = req.params;
const {nivel} = req.params;
let cursoMatematicas = [];
if (tema == "*"){
  cursoMatematicas = matematicas.filter(curso => curso.nivel == nivel);
}
else {
  cursoMatematicas = matematicas.filter(curso => curso.tema == tema && curso.nivel == nivel);
}
if (cursoMatematicas.length === 0){
  return res.status(404).send(`${res.statusCode}: No se han encontrado cursos de matematicas del tema ${tema} con un nivel de fificultad ${nivel}`);
}
cursoMatematicas = JSON.stringify(cursoMatematicas);
return res.send(cursoMatematicas);
});


// routing con otros metodos distintos al metodo get

routerMatematicas.post("/", (req, res) => {
  const nuevoCurso = req.body;
  matematicas.push(nuevoCurso);
  res.send(JSON.stringify(matematicas));
});


module.exports = routerMatematicas;