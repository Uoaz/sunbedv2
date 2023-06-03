const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {

        // Système de recherche poussé
        if(req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2) {
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`
                return res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({ 
                where: {
                    name: { // "name" est la propriété du modèle pokémon
                        [Op.like]: `%${name}%` // "name" est le critère de la recherche
                    }
                },
                order: ['name'],
                limit: limit
            })
            // Limit de 5 pokémon qui s'affiche mais compte le total (système de pagination)
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                res.json({ message, data: rows })
            })
        } else {
            Pokemon.findAll({ order: ['name'] })
            .then(pokemon => {
                if(pokemon === null) {
                    const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({message})
                }
                const message = 'La liste dess pokémons a bien été récupérée.'
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error })
            })
        }
    })
}