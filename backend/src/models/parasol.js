// Pour validateur custom 
const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insect", "Vol", "Normal", "Electrik", "Fée"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Parasol', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

            // Contrainte (nom de pokémon unique, impossible d'ajouter le meme nom)
            unique : {
                msg: 'Le nom est déjà pris.'
            },

            // Validateur Sequelize
            validate: {
                notEmpty : { msg: 'Veuillez entrer le nom du Pokémon.' },
                notNull : { msg: 'Le nom est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,

            // Validateur Sequelize + min max

            validate: {
                isInt : { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull : { msg: 'Les points de vie sont une propriété requise.' },
                min : {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou égales à 0'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieurs ou égales à 999'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt : { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts.' },
                notNull : { msg: 'Les points de dégâts sont une propriété requise.' },
                min : {
                    args: [0],
                    msg: 'Les points de dégâts doivent être supérieurs ou égales à 0'
                },
                max: {
                    args: [99],
                    msg: 'Les points de dégâts doivent être inférieurs ou égales à 999'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl : { msg: 'Utilisez uniquement une URL valide pour l\image.' },
                notNull : { msg: 'L\image une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },

            // Validateur custom

            validate : {
                isTypesValid(value) {
                    if(!value) {
                        throw new Error('Un Pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un Pokémon ne peux pas avoir plus de trois types.')
                    }
                    // value.split(',').forEach(type => {
                    //     if(!validTypes.includes(type)) {
                    //         throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`);
                    //     }
                    // });


                    try {
                        value.split(',').forEach(type => {
                            if (!validTypes.includes(type)) {
                                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`);
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        // Handle the error here
                    }
                }
            }
        }
    }, 
        
        // paramètre global
        {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
        })
}