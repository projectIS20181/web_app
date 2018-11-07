var connection = require('./Mysql.connection');
var md5 = require('md5');
const GENDER = require('../configs/constant').GENDER;
const USER_ROLE = require('../configs/constant').USER_ROLE;

var UserModel = {};

UserModel.addNewUser = (user) => {
    return new Promise((resolve, reject) => {
        if ((!user.email && !user.user_name) || !user.password || !user.role){
            resolve(false);
        }
        let userArr = [
            user.user_name, 
            user.email, 
            md5(user.password), 
            user.role
        ];
        const sql = 'INSERT INTO User (user_name, email, password, role) VALUES ?';
        connection.query(sql, [[userArr]], (err, result, fields) => {                
            if(err) reject(err);
            console.log(result);
            if(result && result.affectedRows) {
                resolve(result.insertId)
            }else{
                resolve(false);
            }
        });
    });
}

UserModel.addNewCandidate = (candidate) => {
    return new Promise((resolve, reject) => {
        if(!candidate.user_id_fk) {
            reject(false);
        }
        var candidateArr = [candidate.user_id_fk];
        var fields = 'user_id_fk, ';
        if(candidate.first_name){
            fields += 'first_name, ';
            candidateArr.push(candidate.first_name);
        }
        if(candidate.last_name){
            fields += 'last_name, ';
            candidateArr.push(candidate.last_name);
        }
        if(candidate.gender){
            fields += 'gender, ';
            candidateArr.push(candidate.gender);
        }
        if(candidate.birthday){
            fields += 'birthday, ';
            candidateArr.push(candidate.birthday);            
        }
        if(candidate.phone){
            fields += 'phone, ';
            candidateArr.push(candidate.phone);            
        }
        if(candidate.address){
            fields += 'address, ';
            candidateArr.push(candidate.address);            
        }
        fields = fields.slice(0,-2);

        const sql = 'INSERT INTO Candidate (' + fields + ') VALUES ?';
        var query = connection.query(sql, [[candidateArr]], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows){
                resolve(result.insertId); 
            }else{
                resolve(false);
            }
        });
        console.log(query.sql);
    });
}

UserModel.addNewCompanyUser = (companyUser) => {
    return new Promise((resolve, reject) => {
        if(!companyUser.user_id_fk || !companyUser.company_id_fk) {
            reject(false);
        }
        var companyUserArr = [companyUser.company_id_fk, companyUser.user_id_fk]
        var fields = 'company_id_fk, user_id_fk, ';
        if(companyUser.first_name){
            fields += 'first_name, ';
            companyUserArr.push(companyUser.first_name);
        }
        if(companyUser.last_name){
            fields += 'last_name, ';
            companyUserArr.push(companyUser.last_name);            
        }
        if(companyUser.address){
            fields += 'address, ';
            companyUserArr.push(companyUser.gender);            
        }
        if(companyUser.phone){
            fields += 'phone, ';
            companyUserArr.push(companyUser.phone);            
        }
        if(companyUser.position){
            fields += 'position, ';
            companyUserArr.push(companyUser.address);
        }
        fields = fields.slice(0,-2);

        const sql = 'INSERT INTO Company_user (' + fields + ') VALUES ?';
        connection.query(sql, [companyUserArr], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows){
                resolve(result.insertId);
            }else{
                reject(false);
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


UserModel.candidateSaveRecruitment = (candidateId, recruitmentId) => {
    return new Promise((resolve, reject) => {
        if (!candidateId || !recruitmentId){
            resolve(false);
        }
        insertArr = [[candidateId, recruitmentId]];
        var sql = 'INSERT INTO Candidate_recruitment (candidate_id_fk, recruitment_id_fk) VALUES ? ';
    
        connection.query(sql, [insertArr], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(result.insertId);
            }else{
                resolve(false);
            }
        });
    });
}

UserModel.getRecruitmentByCandidateId = (candidateId, limit = -1, offset = -1) => {
    return new Promise((resolve, reject) => {
        if (!candidateId){
            resolve(false);
        }
        var sql = 'SELECT Recruitment.* FROM Recruitment, Candidate_recruitment WHERE recruitment_id_fk = recruitment_id AND candidate_id_fk = ? ';
        if(limit > -1 && offset > -1) {
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }
        connection.query(sql, [candidateId], (err, results, fields) => {                
            if(err) reject(err);
            if(results && results.length){
                resolve(results);
            }else{
                resolve(false);
            }
        })
    });
}

UserModel.deleteRecByCandidate = (candidateId, recruitmentId) => {
    return new Promise((resolve, reject) => {
        if (!candidateId || !recruitmentId){
            resolve(false);
        }
        
        var sql = 'DELETE FROM Candidate_recruitment WHERE candidate_id_fk = ? AND recruitment_id_fk = ? ';
        connection.query(sql, [candidateId, recruitmentId], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}

UserModel.getUserByEmailOrName = (user) => {
    return new Promise((resolve, reject) => {
        if ((!user.email && !user.user_name) || !user.password || !user.role){
            resolve(false);
        }
        var target = '';
        if(user.email){
            target = "email = '" + user.email + "'";
        }else {
            target = "user_name = '" + user.user_name + "'";
        }
        var sql = 'SELECT user_id, user_name, email, role, created_date FROM User WHERE ' + target + ' AND password = ? AND role = ?';
        var query = connection.query(sql, [md5(user.password), parseInt(user.role)], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.length){
                resolve(result[0]);
            }else{
                resolve(false);
            }
        });
        console.log(query.sql);
    }); 
}

UserModel.getCandidateByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId){
            resolve(false);
        }
        var sql = 'SELECT * FROM Candidate WHERE user_id_fk = ' + userId;
        connection.query(sql, (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.length){
                resolve(result[0]);
            }else{
                resolve(false);
            }
        });
    });
}

UserModel.getCompanyUserByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId){
            resolve(false);
        }
        var sql = 'SELECT * FROM Company_user WHERE user_id_fk = ' + userId;
        connection.query(sql, (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.length){
                resolve(result);
            }else{
                resolve(false);
            }
        });
    });
}

UserModel.updateCandidateById = (candidate) => {
    return new Promise((resolve, reject) => {
        if (!candidate.candidate_id){
            resolve(false);
        }
        var fields = "";
        if(candidate.first_name){
            fields += "first_name = " + "'" + candidate.first_name + "' , ";
        }
        if(candidate.last_name){
            fields += "last_name = " + "'" + candidate.last_name + "' , ";
        }
        if(candidate.gender){
            fields += "gender = " + candidate.gender + " , ";
        }
        if(candidate.birthday){
            fields += "birthday = " + "'" + candidate.birthday + "' , ";
        }
        if(candidate.phone){
            fields += "phone = " + "'" + candidate.phone + "' , ";
        }
        if(candidate.address){
            fields += "address = " + "'" + candidate.address + "' , ";
        }
        if(candidate.avatar){
            fields += "avatar = " + "'" + candidate.avatar + "' , ";
        }
        if(candidate.career_info_id_fk){
            fields += "career_info_id_fk = " + "'" + candidate.career_info_id_fk + "' , ";
        }
        fields = fields.slice(0,-2);
        
        var sql = 'UPDATE candidate SET ' + fields + ' WHERE candidate_id = ?';
        connection.query(sql, [candidate.candidate_id], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}
UserModel.getCandidateById = (candidateId) => {
    return new Promise((resolve, reject) => {
        if (!candidateId){
            resolve(false);
        }
        var sql = 'SELECT * FROM Candidate WHERE candidate_id = ?';
        connection.query(sql, [candidateId], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.length){
                resolve(result[0]);
            }else{
                resolve(false);
            }
        });
    });
}

module.exports = UserModel;