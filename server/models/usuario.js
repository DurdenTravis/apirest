const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role váido'
}
let Schema = mongoose.Schema;


let usuarioSchemaa = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchemaa.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchemaa.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchemaa);