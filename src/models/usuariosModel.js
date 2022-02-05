const { dbQuery } = require("../../db");
const { MSGS } = require("../../msgs");

module.exports.listUsuarios = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuarios`, []); 
    return retorno;
}

module.exports.insertUsuario = async (usuario, email, senha) => {
    await dbQuery(`INSERT INTO usuarios(usuario, email, senha) VALUES('${usuario}', '${email}', '${senha}')`);
    return `${MSGS.registroCriado}`;
}

module.exports.selectUsuario = async (id) => {
    const retorno = await dbQuery(`SELECT * FROM usuarios WHERE id = ${id}`);
    return retorno;
}

module.exports.deleteUsuario = async (id) => {
    await dbQuery(`DELETE FROM usuarios WHERE id = ${id}`);
    return `${MSGS.registroDeletado} ${id}`; 
}

module.exports.updateUsuario = async (usuario, email, senha,  id) => {
    await dbQuery(`UPDATE usuarios SET usuario = '${usuario}', email = '${email}', senha = '${senha}' WHERE id = ${id}`);
    return this.selectUsuario(id);
}