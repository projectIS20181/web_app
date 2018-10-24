// ====== USER ======
module.exports.USER_ROLE = {
    CANDIDATE: 1,
    COMPANY: 2
}
// ====== END USER ======

// ====== COMPANY CANDIDATE ======
module.exports.COMPANY_CANDIDATE = {
    UNFOLLOW: 0,
    CAN_FOLLOW_COM: 1,
    COM_FOLLOW_CAN: 2,
    FOLLOW_EACHOTHER: 3
}

// ====== END COMPANY CANDIDATE ======

// ====== CANDIDATE ======
module.exports.GENDER = {
    NOT_SET: 0,
    MALE: 1,
    FEMALE: 2
}
// ====== END CANDIDATE ======


// ====== RECRUITMENT ======
module.exports.TYPE_SALARY = {
    NEGOTIATION: 1, 
    VND: 2,
    USD: 3
}
module.exports.TYPE_CANDIDATE = {
    OFFICIAL: 1,
    PARTTIME: 2,
    FREELANCE: 3,
    INTERN: 4
}
module.exports.TYPE_POST = {
    POSTING: 1, //dang Dang
    PAUSING: 2, //Tam dung
    EXPIRED: 3, // het han
}
module.exports.DELETED_RECRUITMENT = {
    NO: 0, //default
    YES: 1
}
module.exports.GENDER_REQUIREMENT = {
    MALE: 0,
    FEMALE: 1,
    BOTH: 2
}
// ====== END RECRUITMENT ======