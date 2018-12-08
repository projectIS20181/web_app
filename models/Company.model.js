var connection = require('./Mysql.connection');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;

var CompanyModel = {}

CompanyModel.addNewCompany = (company) => {
    return new Promise((resolve, reject) => {
        if(!company.company_name) {
            resolve(false);
        }        

        var companyArr = [];
        var fields = '';
        if(company.company_name){
            fields += 'company_name, ';
            companyArr.push(company.company_name);
        }
        if(company.total_employee){
            fields += 'total_employee, ';
            companyArr.push(company.total_employee);
        }
        if(company.intro){
            fields += 'intro, ';
            companyArr.push(company.intro);
        }
        if(company.logo){
            fields += 'logo, ';
            companyArr.push(company.logo);
        }
        if(company.banner){
            fields += 'banner, ';
            companyArr.push(company.banner);
        }
        if(company.location){
            fields += 'location, ';
            companyArr.push(company.location);
        }        
        
        fields = fields.slice(0,-2);

        const sql = 'INSERT INTO Company (' + fields + ') VALUES ?';
        connection.query(sql, [[companyArr]], (err, result) => {                
            if(err) reject(err);
            if(result && result.affectedRows) {
                resolve(result.insertId);
            }else{
                resolve(false);
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

CompanyModel.updateCompanyById = (company) => {
    return new Promise((resolve, reject) => {
        if (!company.company_id){
            resolve(false);
        }
        var fields = "";
        if(company.company_name){
            fields += 'company_name = ' + '"' + company.company_name + '" , ';
        }
        if(company.total_employee){
            fields += 'total_employee = ' + '"' + company.total_employee + '" , ';
        }
        if(company.intro){
            fields += 'intro = ' + '"' + company.intro + '" , ';
        }
        if(company.logo){
            fields += 'logo = ' + '"' + company.logo + '"' + ' , ';
        }
        if(company.banner){
            fields += 'banner = ' + '"' + company.banner + '"' + ' , ';
        }
        if(company.location){
            fields += 'location = ' + '"' + company.location +'"' + ' , ';
        }             
        fields = fields.slice(0,-2);
        
        var sql = 'UPDATE company SET ' + fields + ' WHERE company_id = ' + company.company_id + ' ';
        connection.query(sql, (err, result) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}
module.exports = CompanyModel;