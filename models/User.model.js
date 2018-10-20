var connection = require('./Mysql.connection');
var md5 = require('md5');
const GENDER = require('../configs/constant').GENDER;

var UserModel = {};

UserModel.addNewUser = (user) => {
    return new Promise((resolve, reject) => {
        if (!user.userName || !user.password || !user.role){
            reject({
                status: 'FAILED',
                message: 'User Name, Password and Role must not be NULL!'
            });
        }
        let userArr = [
            user.user_name, 
            user.email, 
            md5(user.password), 
            user.role
        ];
        const sql = 'INSERT INTO User (user_name, email, password, role) VALUES ?';
        connection.query(sql, [userArr], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows) {                 
                resolve({
                    status: 'SUCCESS',
                    userId: result.insertId
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot add new user. Check again'
                });
            }
        });
    });
}

UserModel.addNewCandidate = (candidate) => {
    return new Promise((resolve, reject) => {
        if(!candidate.user_id_fk) {
            reject({
                status: 'FAILED',
                message: 'User Id Foreign Key must not be NULL!'
            });
        }
        var candidateArr = [candidate.user_id_fk];
        var fields = 'user_id_fk, ';
        if(candidate.first_name) 
            fields += 'first_name, ';
            candidateArr.push(candidate.first_name);
        if(candidate.last_name)
            fields += 'last_name, ';
            candidateArr.push(candidate.last_name);
        if(candidate.gender)
            fields += 'gender, ';
            candidateArr.push(candidate.gender);
        if(candidate.birthday)
            fields += 'birthday, ';
            candidateArr.push(candidate.birthday);
        if(candidate.phone)
            fields += 'phone, ';
            candidateArr.push(candidate.phone);
        if(candidate.address)
            fields += 'address, ';
            candidateArr.push(candidate.address);
        fields = fields.slice(0,-2);

        const sql = 'INSERT INTO Candidate (' + fields + ') VALUES ?';
        connection.query(sql, [candidateArr], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows){
                resolve({
                    status: 'SUCCESS',
                    candidateId: result.insertId
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot add new user. Check again'
                });
            }
        });
    });
}

UserModel.addNewCompanyUser = (companyUser) => {
    return new Promise((resolve, reject) => {
        if(!companyUser.user_id_fk || !companyUser.company_id_fk) {
            reject({
                status: 'FAILED',
                message: 'UserIdFk and CompanyIdFk must not be NULL!'
            });
        }
        var companyUserArr = [companyUser.company_id_fk, companyUser.user_id_fk]
        var fields = 'company_id_fk, user_id_fk, ';
        if(companyUser.first_name) 
            fields += 'first_name, ';
            companyUserArr.push(companyUser.first_name);
        if(companyUser.last_name)
            fields += 'last_name, ';
            companyUserArr.push(companyUser.last_name);
        if(companyUser.address)
            fields += 'address, ';
            companyUserArr.push(companyUser.gender);
        if(companyUser.phone)
            fields += 'phone, ';
            companyUserArr.push(companyUser.phone);
        if(companyUser.position)
            fields += 'position, ';
            companyUserArr.push(companyUser.address);
        fields = fields.slice(0,-2);

        const sql = 'INSERT INTO Company_user (' + fields + ') VALUES ?';
        connection.query(sql, [companyUserArr], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows){
                resolve({
                    status: 'SUCCESS',
                    company_user_id: result.insertId
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot add new user. Check again'
                });
            }
        });
    });
}

UserModel.getCompanyUserByCompanyId = (companyIdFk) => {
    return new Promise((resolve, reject) => {
        if (!companyIdFk){
            resolve(false);
        }
        var sql = 'SELECT * FROM Company_user WHERE company_id_fk = ? ';
        
        connection.query(sql, [companyIdFk], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve(results);
            }else{
                resolve(false);
            }
        })
    });
}


module.exports = UserModel;