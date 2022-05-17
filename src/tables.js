const { dbQuery } = require("../db");
const { MSGS } = require("../msgs");

module.exports.createUsuariosTable = async () => {
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS usuarios 
        (
        id SERIAL PRIMARY KEY,
        usuario VARCHAR(50) UNIQUE,
        email VARCHAR(100),
        senha VARCHAR(100)
        )`
    );
    console.log(MSGS.tabelaCriada, 'usuarios');
    return `${MSGS.tabelaCriada} usuarios`;
}

module.exports.createMedicamentosTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}medicamentos 
        (
        id SERIAL PRIMARY KEY,
        medicamento VARCHAR(50)
        )`
    );
    return `${MSGS.tabelaCriada} medicamentos`;
}

module.exports.createVacinasTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}vacinas 
        (
        id SERIAL PRIMARY KEY,
        vacina_vermifugo VARCHAR(50),
        tipo SMALLINT,
        doses SMALLINT
        )`
    );
    return `${MSGS.tabelaCriada} vacinas`;
}

module.exports.createAnimaisTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}animais 
        (
        id SERIAL PRIMARY KEY,
        nome_animal VARCHAR(50),
        nro_controle INTEGER UNIQUE,
        data_nascimento DATE,
        sexo SMALLINT,
        matriz INTEGER UNIQUE,
        producao SMALLINT,
        rebanho SMALLINT,
        registrado SMALLINT,
        id_pai SMALLINT,
        id_mae SMALLINT,
        CONSTRAINT fk_pai
            FOREIGN KEY(id_pai) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_mae
            FOREIGN KEY(id_mae) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL
        )`
    );
    return `${MSGS.tabelaCriada} animais`;
};

module.exports.createInseminacoesTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}inseminacoes 
        (
        id SERIAL PRIMARY KEY,
        data_inseminacao DATE,
        data_previsao_parto DATE,
        id_animal SMALLINT,
        id_reprodutor SMALLINT
        )`
    );
    /*
        CONSTRAINT fk_animal
            FOREIGN KEY(id_animal) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_reprodutor
            FOREIGN KEY(id_reprodutor) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL
        */
    return `${MSGS.tabelaCriada} inseminacoes`;
};

module.exports.createPartosTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}partos 
        (
        id SERIAL PRIMARY KEY,
        data_parto DATE,
        nro_controle_cria SMALLINT,
        id_cria SMALLINT,
        id_reprodutor SMALLINT,
        id_mae SMALLINT
        )`
    );
    /*
        CONSTRAINT fk_cria
            FOREIGN KEY(id_cria) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_reprodutor
            FOREIGN KEY(id_reprodutor) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_mae
            FOREIGN KEY(id_mae) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL
        */
    return `${MSGS.tabelaCriada} partos`;
};

module.exports.createVacinacoesTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}vacinacoes 
        (
        id SERIAL PRIMARY KEY,
        data_vacinacao DATE,
        id_animal SMALLINT,
        id_vacina SMALLINT
        )`
    );
    /*
        CONSTRAINT fk_animal
            FOREIGN KEY(id_animal) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_vacina
            FOREIGN KEY(id_vacina) 
            REFERENCES ${schema}vacinas(id)
            ON DELETE SET NULL
        */
    return `${MSGS.tabelaCriada} vacinacoes`;
};

module.exports.createOcorrenciasTable = async (nome_schema) => {
    const schema = nome_schema ? nome_schema+'.': '';
    await dbQuery(
        `CREATE TABLE IF NOT EXISTS ${schema}ocorrencias 
        (
        id SERIAL PRIMARY KEY,
        data_ocorrencia DATE,
        descricao VARCHAR(500),
        id_animal SMALLINT,
        id_medicamento SMALLINT
        )`
    );
    /*
        CONSTRAINT fk_animal
            FOREIGN KEY(id_animal) 
            REFERENCES ${schema}animais(id)
            ON DELETE SET NULL,
        CONSTRAINT fk_medicamento
            FOREIGN KEY(id_medicamento) 
            REFERENCES ${schema}medicamentos(id)
            ON DELETE SET NULL
        */
    return `${MSGS.tabelaCriada} ocorrencias`;
};
