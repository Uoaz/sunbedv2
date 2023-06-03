const { Sequelize, DataTypes } = require('sequelize')
const ParasolModel = require('../models/parasol')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

// ORM SEQUELIZE connection bdd start
const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
    timezone: 'Etc/GMT-2',
},
    logging: false
})
// ORM SEQUELIZE connection bdd end

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
    // Cela va prendre tout les pokemon et les mettre dans la table/model Pokemons
    pokemons.map(pokemon => {
         // Ajout d'une colonne dans la table/model Pokemons
    Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
    }).then(pokemon => console.log(pokemon.toJSON()))
})


// Création d'un user + hash mdp

bcrypt.hash('Ibrahim.69!', 10)
.then(hash => User.create({ username: 'ibrahim', password: hash }))
.then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
})
}

module.exports = { 
    initDb, Pokemon, User
}