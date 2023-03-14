const { Pool } = require('pg');
const { MSGS } = require('./msgs');

module.exports.openConnection = () => {
    const db = new Pool({
        user: 'mbkusniilqqstr',
        host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
        database: 'd4d5en3f6b1vhd',
        password: 'fcc82a460b5ec285443120307c6217d5561fc108bdcf2c2fcaee0bbff20c2030',
        port: 5432,
        ssl: true
    });

    return db;
}

module.exports.dbQuery = (query, params) => {
    let db = this.openConnection();

    // console.log(query)

    return new Promise((resolve, reject) => {
        db.query(query, params, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
    .finally(() => {
        db.end();
        console.log(MSGS.fechaConexao);
    })
}