// Company Candidate model
var connection = require('./Mysql.connection');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;
var ComcanModel = {};

ComcanModel.insertComCanFollowing = (candidateId, companyId, type = 0) => {
    return new Promise((resolve, reject) => {
        if (!candidateId || !companyId || !type){
            resolve(false);
        }
        insertArr = [[candidateId, companyId, type]]
        var sql = 'INSERT INTO Company_candidate (candidate_id_fk, company_id_fk, type) VALUES ? ';
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

ComcanModel.getTypeOfComCan = (candidateId, companyId) => {
    return new Promise((resolve, reject) => {
        if (!candidateId || !companyId){
            resolve(false);
        }
        var sql = 'SELECT company_candidate_id, type FROM Company_candidate WHERE candidate_id_fk = ? AND company_id_fk = ?';
        connection.query(sql, [candidateId, companyId], (err, result, fields) => {                
            if(err) reject(err);
            resolve(result);
        });
    });
}

ComcanModel.updateComCanFollowing = (candidateId, companyId, type) => {
    return new Promise((resolve, reject) => {
        if (!candidateId || !companyId){
            resolve(false);
        }
        updateArr = [type, candidateId, companyId]
        var sql = 'UPDATE Company_candidate SET type = ? WHERE candidate_id_fk = ? AND company_id_fk = ?';
        connection.query(sql, updateArr, (err, result, fields) => {
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(true);
            }else{
                resolve(false);
            }
        });
    });
}

// get candidates followed by company
ComcanModel.getCanByComId = (companyId, limit = -1, offset = -1) => {
    return new Promise((resolve, reject) => {
        if (!companyId){
            resolve(false);
        }
        var varArr = [companyId, COMPANY_CANDIDATE.COM_FOLLOW_CAN, COMPANY_CANDIDATE.FOLLOW_EACHOTHER];
        var sql = 'SELECT Candidate.* FROM Candidate, Company_candidate WHERE candidate_id = candidate_id_fk AND company_id_fk = ? AND (type = ? OR type = ? ) ';       
        
        if(limit > -1 && offset > -1) {
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        } 
        connection.query(sql, varArr, (err, results, fields) => {                
            if(err) reject(err);
            if(results && results.length){
                resolve(results);
            }else{
                resolve(false);
            }
        })
    });
}

// get companies followed by candidate
ComcanModel.getComByCanId = (candidateId, limit = -1, offset = -1) => {
    return new Promise((resolve, reject) => {
        if (!candidateId){
            resolve(false);
        }
        var varArr = [candidateId, COMPANY_CANDIDATE.CAN_FOLLOW_COM, COMPANY_CANDIDATE.FOLLOW_EACHOTHER];
        var sql = 'SELECT Company.* FROM Company, Company_candidate WHERE company_id = company_id_fk AND candidate_id_fk = ? AND (type = ? OR type = ? ) ';
        
        if(limit > -1 && offset > -1) {
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }

        connection.query(sql, varArr, (err, results, fields) => {                
            if(err) reject(err);
            if(results && results.length){
                resolve(results);
            }else{
                resolve(false);
            }
        })
    });
}

module.exports = ComcanModel;