var connection = require('./Mysql.connection');

var IndustryModel = {}

IndustryModel.getIndustryList = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Industry';
        connection.query(sql, (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve({
                    status: 'SUCCESS',
                    result: results
                });
            }else{
                resolve({
                    status: 'FAILED',
                    message: 'Cannot get Industries'
                });
            }
        })
    });
}

module.exports = IndustryModel;