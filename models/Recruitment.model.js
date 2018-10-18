var connection = require('./Mysql.connection');
const TYPE_SALARY = require('../configs/constant').TYPE_SALARY;
const TYPE_POST = require('../configs/constant').TYPE_POST;

var RecruitmentModel = {};

RecruitmentModel.addNewRecruitment = (recruitment) => {
    return new Promise((resolve, reject) => {
        if (!recruitment.companyIdFk || !recruitment.industryIdFk){
            reject({
                status: 'FAILED',
                message: 'companyIdFk and industryIdFk must not be null.'
            });
        }
        let insertObj = [
            recruitment.companyIdFk,
            recruitment.industryIdFk || 
            recruitment.workId || '',
            recruitment.position || '',
            recruitment.description || '',
            recruitment.requirement || '',
            recruitment.location || '',
            recruitment.minSalary || 0,
            recruitment.maxSalary || 0,
            recruitment.typeSalary || TYPE_SALARY.NEGOTIATION,
            recruitment.typeCandidate,
            recruitment.deadline,
            recruitment.jobtags,
            recruitment.typePost || TYPE_POST.POSTING
        ];
        const sql = 'INSERT INTO Recruitment (company_id_fk, industry_id_fk, work_id, position, description, requirement, location, min_salary, max_salary, type_salary, type_candidate, deadline, job_tags, type_post) VALUES ?';
        connection.query(sql, [insertObj], (err, results, fields) => {                
            if(err) reject(err);
            if(results.affectedRows){
                resolve({
                    status: 'SUCCESS',
                    recruitmentId: results.insertId
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot add new recruitment. Check again'
                });
            }
        })
    });
}

RecruitmentModel.getById = (recruitmentId) => {
    return new Promise((resolve, reject) => {
        if (!recruitmentId){
            resolve({
                status: 'FAILED',
                message: 'recruitmentId must not be NULL!'
            });
        }
        var sql = 'SELECT * FROM Recruitment WHERE recruitment_id = ? ';
        
        connection.query(sql, [recruitmentId], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve({
                    status: 'SUCCESS',
                    result: results[0]
                });
            }else{
                resolve({
                    status: 'FAILED',
                    message: 'Cannot get recruitment by id'
                });
            }
        })
    });
}

RecruitmentModel.getByIndustryId = (industryIdFk, limit = -1, offset = -1) => {
    return new Promise((resolve, reject) => {
        if (!industryIdFk){
            reject({
                status: 'FAILED',
                message: 'industryIdFk must not be NULL!'
            });
        }
        var sql = 'SELECT * FROM Recruitment WHERE industry_id_fk = ? ';
        if(limit > -1 && offset > -1) {
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }
        connection.query(sql, [industryIdFk], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve({
                    status: 'SUCCESS',
                    result: results
                });
            }else{
                reject({
                    status: 'FAILED',
                    message: 'Cannot get recruitment by industry id'
                });
            }
        })
    });
}



module.exports = RecruitmentModel;