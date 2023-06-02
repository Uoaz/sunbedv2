// app.get("/api", (req, res) => {
//     res.json({})
// })

// IMPORT
const express = require('express')
// const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = 3000

// Création middleware (url entrante) + favicon start
app
.use(favicon(__dirname + '/favicon.ico'))
// .use(morgan('dev'))
.use(cors())
.use(bodyParser.json()) //sans cela la création de s'effectue pas (stringify)
// Création middleware (url entrante) + favicon end

sequelize.initDb()

// Ici, nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// On ajoute la gestion des erreurs 404

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})




app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))