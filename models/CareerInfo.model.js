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
        
        var sql = 'UPDATE Career_info SET ' + fields + ' WHERE career_info_id = ?';
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

module.exports = CareerModel;