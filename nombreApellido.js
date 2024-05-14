const fs = require('node:fs/promises')
const express = require("express")
const exphbs = require('express-handlebars')
const app = express()

app.set("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/nombre", (req, res) => {
  const { nombre, apellido } = req.query

  const usuario = {
    nombre,
    apellido
  }

  fs.readdir(".")
    .then(files => {
      if (files.includes("data")) {
        fs.writeFile("./data/usuarioForm.json", JSON.stringify(usuario))
          .then(() => {
            res.render(
              "result",
              {
                mensaje: "Usuario creado con éxito"}
              )
          })
      } else {
        fs.mkdir("data")
          .then(() => {
            fs.writeFile("./data/usuarioForm.json", JSON.stringify(usuario))
              .then(() => {
                res.render(
                  "result",
                  {
                    mensaje: "Usuario creado con éxito"
                  })
              })
          })
      }
    })

})

app.get("/consola" , (req, res) => {
  fs.readFile("./data/usuarioForm.json", "utf-8")
    .then(data => {
      const usuario = JSON.parse(data)
      console.log(usuario)
      res.render("result", {
        mensaje: "Mensaje por consola mostrado con éxito"
      })
    })
    .catch(err => {
      res.render(
        "result",
        {
          mensaje: `Error: ${err}`
        }
      )
    })
})

app.get("/nuevoJuego", (req, res) => {
  const { nombre, consola } = req.query

  const juego = { nombre, consola }

  fs.writeFile("./data/juegos.json", JSON.stringify(juego))
    .then(() => {
      res.render(
        "result",
        {
          mensaje: "Juego Guardado con Éxito"
        }
      )
    })
})

app.listen(3000, () => console.log("App escuchando puerto 3000"))
