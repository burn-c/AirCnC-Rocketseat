

// index -> retorna uma listagem de sessões
// show -> listar uma unica sessão
// store -> criar uma sessão
// update -> alterar uma sessão
// destroy -> remover/deletar uma sessão

const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const {email} = req.body; // mesma coisa que 'email = req.body.email'

        let user = await User.findOne({email});

        if (!user) {
            user = await User.create({email});
        }
        // const user = await User.create({email});

        return res.json(user);
    }
}