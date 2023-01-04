const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listUsuarios = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuarios`); 
    return retorno;
}

module.exports.insertUsuario = async (usuario, email, senha) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO usuarios(usuario, email, senha) VALUES('${usuario}', '${email}', '${senha}') RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectUsuarioById = async (id) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE id = ${id}`);
    return retorno;
}

module.exports.selectUsuarioByUsername = async (usuario) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`);
    return retorno;
}

module.exports.deleteUsuario = async (id) => {
    await dbQuery(`DELETE FROM usuarios WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateUsuario = async (usuario, email, senha,  id) => {
    const retorno = {
        data: await dbQuery(`UPDATE usuarios SET usuario = '${usuario}', email = '${email}', senha = '${senha}' WHERE id = ${id} RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}