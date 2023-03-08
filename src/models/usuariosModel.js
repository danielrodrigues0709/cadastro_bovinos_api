const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listUsuarios = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuarios`); 
    return retorno;
}

module.exports.insertUsuario = async (nome_usuario, username, telefone, email, senha) => {
    const retorno = {
        data: await dbQuery(`INSERT INTO usuarios(nome_usuario, username, telefone, email, senha) VALUES('${nome_usuario}', '${username}', '${telefone}', '${email}', '${senha}') RETURNING *`),
        message: `${MSGS.registroCriado}`
    };
    return retorno;
}

module.exports.selectUsuarioById = async (id) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE id = ${id}`);
    return retorno;
}

module.exports.logIn = async (username) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE username = '${username}' OR email = '${username}'`);
    return retorno;
}

module.exports.selectUsuarioByUsername = async (username) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE username = '${username}'`);
    return retorno;
}

module.exports.selectUsuarioByEmail = async (email) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE email = '${email}'`);
    return retorno;
}

module.exports.deleteUsuario = async (id) => {
    await dbQuery(`DELETE FROM usuarios WHERE id = ${id}`);
    return `${MSGS.registroDeletado}`; 
}

module.exports.updateUsuario = async (nome_usuario, username, telefone, email, senha,  id) => {
    const retorno = {
        data: await dbQuery(`UPDATE usuarios SET nome_usuario = '${nome_usuario}', username = '${username}', telefone = '${telefone}', email = '${email}', senha = '${senha}' WHERE id = ${id} RETURNING *`),
        message: `${MSGS.registroAtualizado}`
    };
    return retorno;
}