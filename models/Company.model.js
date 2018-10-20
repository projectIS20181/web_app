var connection = require('./Mysql.connection');

var CompanyModel = {}

CompanyModel.addNewCompany = (company) => {
    return new Promise((resolve, reject) => {
        if(!company.name) {
            reject({
                status: 'FAILED',
                message: 'Company name must not be null.'
            });
        }
        let insertObj = [
            company.name,
            company.total_employee || 0,
            company.intro || '',
            company.logo || '',
            company.banner || '',
            company.location || ''
        ];
        const sql = 'INSERT INTO Company (company_name, total_employee, intro, logo, banner, location) VALUES ?';
        connection.query(sql, [insertObj], (err, results, fields) => {                
            if(err) reject(err);
            if(results.affectedRows) {
                resolve({
                    status: 'SUCCESS',
                    companyId: results.insertId
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot add new Company. Check again'
                });
            }
        })
    });
}

CompanyModel.getById = (companyId) => {
    return new Promise((resolve, reject) => {
        if (!companyId){
            resolve(false);
        }
        var sql = 'SELECT * FROM Company WHERE company_id = ? ';
        
        connection.query(sql, [companyId], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve(results[0]);
            }else{
                resolve(false);
            }
        })
    });
}

module.exports = CompanyModel;