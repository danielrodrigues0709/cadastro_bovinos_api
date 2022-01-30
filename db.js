const { Pool } = require('pg');

module.exports.openConnection = () => {
    const db = new Pool({
        user: 'vwbhlvsayanmrd',
        host: 'ec2-34-230-198-12.compute-1.amazonaws.com',
        database: 'd31ta7mj7p5ikh',
        password: '27de96173cf0808dda8661bd6ce7f0eb7693f8de7e075ab12bf407d69daeaf5d',
        port: 5432,
        ssl: true
    });

return db;
}

exports.dbQuery = (query, params=[]) => {
    const db = this.openConnection();
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}