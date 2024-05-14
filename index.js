const axios = require('axios')
const fs = require('node:fs/promises')

// definir url a consultar
// hacer solicitud get
// "persistir" la data en el proyecto

const URL = 'https://randomuser.me/api/'

axios.get(URL)
  .then( ({data}) => {
    // console.log(data)
    const { gender } = data.results[0]
    const { first, last } = data.results[0].name

    const user = {
      gender,
      first,
      last
    }

    fs.readFile( "./usuario.json", "utf-8")
      .then(data => {
        console.log(data)

        const userJSON = JSON.parse(data)

        userJSON.usuarios.push(user)
        fs.writeFile("usuario.json", JSON.stringify(userJSON))
          .then(() => console.log("Usuario creado con éxito"))
      })
  })
  