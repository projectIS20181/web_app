var connection = require('./Mysql.connection');
var CareerModel = {}

CareerModel.insertNewCareer = (careerInfo) => {
    return new Promise((resolve, reject) => {
        if (!careerInfo){
            resolve(false);
        }
        var fields = "";
        var careerInfoArr = [];
        if(careerInfo.industry_id_fk){
            fields += "industry_id_fk, ";
            careerInfoArr.push(careerInfo.industry_id_fk);
        }
        if(careerInfo.career_goal){
            fields += "career_goal, ";
            careerInfoArr.push(careerInfo.career_goal);
        }
        if(careerInfo.min_salary){
            fields += "min_salary, ";
            careerInfoArr.push(careerInfo.min_salary);
        }
        if(careerInfo.max_salary){
            fields += "max_salary, ";
            careerInfoArr.push(careerInfo.max_salary);
        }
        if(careerInfo.salary_type){
            fields += "salary_type, ";
            careerInfoArr.push(careerInfo.salary_type);
        }
        if(careerInfo.job_type){
            fields += "job_type, ";
            careerInfoArr.push(careerInfo.job_type);
        }
        if(careerInfo.position){
            fields += "position, ";
            careerInfoArr.push(careerInfo.position);
        }
        if(careerInfo.experience){
            fields += "experience, ";
            careerInfoArr.push(careerInfo.experience);
        }
        if(careerInfo.degree){
            fields += "degree, ";
            careerInfoArr.push(careerInfo.degree);
        }
        if(careerInfo.foreign_lang){
            fields += "foreign_lang, ";
            careerInfoArr.push(careerInfo.foreign_lang);
        }
        if(careerInfo.level_foreign_lang){
            fields += "level_foreign_lang, ";
            careerInfoArr.push(careerInfo.level_foreign_lang);
        }
        if(careerInfo.resume_link){
            fields += "resume_link, ";
            careerInfoArr.push(careerInfo.resume_link);
        }
        fields = fields.slice(0,-2);
        
        var sql = 'INSERT INTO Career_info (' + fields + ') VALUES ?';
        var query = connection.query(sql, [[careerInfoArr]], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(result.insertId);
            }else{
                resolve(false);
            }
        });
        console.log(query.sql);
    });
}

CareerModel.updateCareerById = (careerInfo) => {
    return new Promise((resolve, reject) => {
        if (!careerInfo.career_info_id){
            resolve(false);
        }
        var fields = "";
        if(careerInfo.career_goal){
            fields += "career_goal = " + "'" + careerInfo.career_goal + "' , ";
        }
        if(careerInfo.min_salary){
            fields += "min_salary = " + careerInfo.min_salary + " , ";
        }
        if(careerInfo.max_salary){
            fields += "max_salary = " + careerInfo.max_salary + " , ";
        }
        if(careerInfo.salary_type){
            fields += "salary_type = " + careerInfo.salary_type + " , ";
        }
        if(careerInfo.job_type){
            fields += "job_type = " + careerInfo.job_type + " , ";
        }
        if(careerInfo.position){
            fields += "position = " + "'" + careerInfo.position + "' , ";
        }
        if(careerInfo.experience){
            fields += "experience = " + careerInfo.experience + " , ";
        }
        if(careerInfo.degree){
            fields += "degree = " + careerInfo.degree + " , ";
        }
        if(careerInfo.foreign_lang){
            fields += "foreign_lang = " + careerInfo.foreign_lang + " , ";
        }
        if(careerInfo.level_foreign_lang){
            fields += "level_foreign_lang = " + careerInfo.level_foreign_lang + " , ";
        }
        if(careerInfo.resume_link){
            fields += "resume_link = " + "'" + careerInfo.resume_link + "' , ";
        }
        fields = fields.slice(0,-2);
        
        var sql = 'UPDATE Career_info SET (' + fields + ') WHERE career_info_id = ?';
        var query = connection.query(sql, [careerInfo.career_info_id], (err, result, fields) => {                
            if(err) reject(err);
            if(result && result.affectedRows){
                resolve(true);
            }else{
                resolve(false);
            }
        });
        console.log(query.sql);
    });
}

CareerModel.search = (criteria, limit = 10, offset = 0) => {
    return new Promise((resolve, reject) => {
        if(!criteria) {
            resolve(false);        
        }
        var sql = 'SELECT Candidate.*, Career_info.* FROM Candidate, Career_info WHERE career_info_id = career_info_id_fk AND ';

        if(criteria.position) {
            criteria.position = criteria.position.trim().toLowerCase();
            sql += 'LOWER(Career_info.position) LIKE "%' + criteria.position + '%" AND ';
        }
        if(criteria.degree){
            sql += 'Career_info.degree = ' + criteria.degree + ' AND ';
        }
        if(criteria.job_type){
            sql += 'Career_info.job_type = ' + criteria.job_type + ' AND ';
        }
        if(criteria.min_salary){
            sql += 'Career_info.min_salary >= ' + criteria.min_salary + ' AND ';
        }
        if(criteria.max_salary){
            sql += 'Career_info.max_salary <= ' + criteria.max_salary + ' AND ';
        }
        if(criteria.salary_type){
            sql += 'Career_info.salary_type = ' + criteria.salary_type + ' AND ';
        }
        if(criteria.experience){
            sql += 'Career_info.experience >= ' + criteria.experience + ' AND ';
        }
        if(criteria.foreign_lang){
            sql += 'Career_info.foreign_lang = ' + criteria.foreign_lang + ' AND ';
        }
        if(criteria.foreign_lang){
            sql += 'Career_info.level_foreign_lang >= ' + criteria.level_foreign_lang + ' AND ';
        }
        sql = sql.slice(0,-4);        
        if(limit > -1 && offset > -1) {            
            sql += 'LIMIT ' + limit + ' OFFSET ' + offset;
        }else{
            sql += 'LIMIT 10 OFFSET 0 ';
        }
        var query = connection.query(sql, (err, results, fields) => {                
            if(err) reject(err);
            if(results && results.length){                
                resolve(results);                
            }else{
                resolve(false);
            }
        });
        console.log(query.sql);
    });
}

module.exports = CareerModel;