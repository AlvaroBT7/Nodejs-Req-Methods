// desarrollo backend con javaScript //
// primer servidor con el modulo (mejor dicho paquete) express //

// todo lo necesario para el server con el paquete express
const express = require("express");
const app = express();
const { cursos } = require("./datos/cursos.js");
app.use(express.json());

// routers
const routerMatematicas = require("./routers/matematicas.js");
const routerProgramacion = require("./routers/programacion.js");
app.use("/api/cursos/matematicas", routerMatematicas);
app.use("/api/cursos/programming", routerProgramacion);


app.get("/", (req, res) => {
  return res.status(200).json("Bienvenido a mi primer servidor creado en Node.js con el modulo express 💻");
});

app.get("/:thing", (req, res) => {
  return res.status(404).end();
});

app.get("/:papi/:pcursos", (req, res) => {
  const { papi } = req.params;
  const { pcursos } = req.params;
  if (papi == "api" && pcursos == "cursos"){
    return res.status(200).json(cursos);  
  }
  else return res.status(204).end();
});

// intenta agarrar el puerto de las variables de entorno donde se esta ejecutando la app, y en el caso de que no pueda lo asigna a 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`Server is listening at port: ${PORT}...`);
});