var connection = require('./Mysql.connection');
const TYPE_SALARY = require('../configs/constant').TYPE_SALARY;
const TYPE_POST = require('../configs/constant').TYPE_POST;
const GENDER_REQUIREMENT = require('../configs/constant').GENDER_REQUIREMENT;

var RecruitmentModel = {};

RecruitmentModel.addNewRecruitment = (recruitment) => {
    return new Promise((resolve, reject) => {
        if (!recruitment.company_id_fk || !recruitment.industry_id_fk){
            resolve(false); 
        }
        let insertObj = [
            recruitment.company_id_fk,
            recruitment.industry_id_fk,
            recruitment.work_id || '',
            recruitment.work_name || '',
            recruitment.position || '',
            recruitment.description || '',
            recruitment.requirement || '',
            recruitment.location || '',
            recruitment.min_salary || 0,
            recruitment.max_salary || 0,
            recruitment.min_age || 0,
            recruitment.max_age || 0,
            recruitment.type_salary || TYPE_SALARY.NEGOTIATION,
            recruitment.type_candidate,
            recruitment.gender_requirement || GENDER_REQUIREMENT.BOTH,
            recruitment.deadline,            
            recruitment.job_tags || '',
            recruitment.type_post || TYPE_POST.POSTING
        ];
        const sql = 'INSERT INTO Recruitment (company_id_fk, industry_id_fk, work_id, work_name, position, description, requirement, location, min_salary, max_salary, min_age, max_age, type_salary, type_candidate, gender_requirement, deadline, job_tags, type_post) VALUES ?';
        var query = connection.query(sql, [[insertObj]], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(result.insertId);                
            }else{
                resolve(false);
            }
        });
        // console.log(query.sql);
    });
}

RecruitmentModel.getById = (recruitmentId) => {
    return new Promise((resolve, reject) => {
        if (!recruitmentId){
            resolve(false);
        }
        var sql = 'SELECT * FROM Recruitment WHERE recruitment_id = ? ';
        
        connection.query(sql, [recruitmentId], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){
                resolve(results[0]);
            }else{
                resolve(false);
            }
        })
    });
}

RecruitmentModel.getByIndustryId = (industryIdFk, limit = 10, offset = 0) => {
    return new Promise((resolve, reject) => {
        if (!industryIdFk){
            resolve(false);
        }
        var sql = 'SELECT * FROM Recruitment WHERE industry_id_fk = ? ';
        if(limit > -1 && offset > -1) {
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }
        connection.query(sql, [industryIdFk], (err, results, fields) => {                
            if(err) reject(err);
            if(results.length){                
                resolve(results);                
            }else{
                resolve(false);
            }
        })
    });
}

RecruitmentModel.search = (criteria, limit = 0, offset = 10) => {
    return new Promise((resolve, reject) => {
        if(!criteria) {
            resolve(false);        
        }
        var sql = '';
        // Search with company name
        if(criteria.company_name){
            sql += 'SELECT * FROM Recruitment, Company WHERE company_id = company_id_fk AND ';
            sql += 'company_name LIKE "%' + criteria.company_name + '%" AND ';
        }else{
            sql += 'SELECT * FROM Recruitment WHERE ';
        }

        if(criteria.industry_id) {
            sql += 'industry_id_fk = ' + criteria.industry_id + ' AND ';
        }
        if(criteria.work_name) {
            criteria.work_name = criteria.work_name.trim().toLowerCase();
            sql += '(LOWER(work_name) LIKE "%' + criteria.work_name + '%" OR ';
            sql += 'LOWER(job_tags) LIKE "%' + criteria.work_name + '%") AND ';
        }
        if(criteria.location){
            criteria.location = criteria.location.trim().toLowerCase();
            sql += 'LOWER(location) LIKE "%' + criteria.location + '%" AND ';
        }
        if(limit > -1 && offset > -1) {
            sql = sql.slice(0,-4);
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }
        var query = connection.query(sql, (err, results, fields) => {                
            if(err) reject(err);
            if(results && results.length){                
                resolve(results);                
            }else{
                resolve(false);
            }
        });
        // console.log(query.sql);
    });
}

RecruitmentModel.rate = (point, recruitmentId) => {
    return new Promise((resolve, reject) => {
        if(!recruitmentId){
            resolve(false);
        }
        var sql = 'UPDATE Recruitment SET rating_quantity = rating_quantity + 1, total_rating = total_rating + ? WHERE recruitment_id = ? ';
   
        var query = connection.query(sql, [point, recruitmentId], (err, result, fields) => {                
            if(err) reject(err);
            if(result.affectedRows){                
                resolve(true);                
            }else{
                resolve(false);
            }
        });
        console.log(query.sql)
    });
}

RecruitmentModel.getRatingPoint = (recruitmentId) => {
    return new Promise((resolve, reject) => {
        if(!recruitmentId){
            resolve(false);
        }
        var sql = 'SELECT total_rating, rating_quantity FROM Recruitment WHERE recruitment_id = ' + recruitmentId;
   
        var query = connection.query(sql, (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.length){                
                resolve(result[0]);                
            }else{
                resolve(false);
            }
        });
        // console.log(query.sql)
    });
}


module.exports = RecruitmentModel;