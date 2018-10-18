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
            user.userName, 
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
        if(!candidate.userIdFk) {
            reject({
                status: 'FAILED',
                message: 'User Id Foreign Key must not be NULL!'
            });
        }
        var candidateArr = [candidate.userIdFk];
        var fields = 'user_id_fk, ';
        if(candidate.firstName) 
            fields += 'first_name, ';
            candidateArr.push(candidate.firstName);
        if(candidate.lastName)
            fields += 'last_name, ';
            candidateArr.push(candidate.lastName);
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
        if(!companyUser.userIdFk || !companyUser.companyIdFk) {
            reject({
                status: 'FAILED',
                message: 'UserIdFk and CompanyIdFk must not be NULL!'
            });
        }
        var companyUserArr = [companyUser.companyIdFk, companyUser.userIdFk]
        var fields = 'company_id_fk, user_id_fk, ';
        if(companyUser.firstName) 
            fields += 'first_name, ';
            companyUserArr.push(companyUser.firstName);
        if(companyUser.lastName)
            fields += 'last_name, ';
            companyUserArr.push(companyUser.lastName);
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
                    companyUserId: result.insertId
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
            resolve({
                status: 'FAILED',
                message: 'companyIdFk must not be NULL!'
            });
        }
        var sql = 'SELECT * FROM Company_user WHERE company_id_fk = ? ';
        
        connection.query(sql, [companyIdFk], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve({
                    status: 'SUCCESS',
                    result: results
                });
            }else{
                resolve({
                    status: 'FAILED',
                    message: 'Cannot get companyIdFk'
                });
            }
        })
    });
}


module.exports = UserModel;