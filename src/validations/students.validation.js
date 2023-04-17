const Joi = require('joi');
const { objectId, phoneNumber } = require('./custom.validation');

const createStudent = {
    body: Joi.object().keys({
        studentsNumber: Joi.string().required(),
        fullName: Joi.string().required(),
        gender: Joi.string().required().valid('Male', 'Female', 'Other'),
        dob: Joi.string().required(),
        birthplace: Joi.string().required(),
        highSchool: Joi.string().required(),
        briefcase: Joi.array().items(Joi.string()),
        citizenId: Joi.string().required(),
        phone: Joi.string().required().custom(phoneNumber),
        address: Joi.string().required()
    }),
};

const getStudents = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getStudent = {
    params: Joi.object().keys({
        studentId: Joi.string().custom(objectId),
    }),
};

const updateStudent = {
    params: Joi.object().keys({
        studentId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        studentsNumber: Joi.string().required(),
        fullName: Joi.string().required(),
        gender: Joi.string().required().valid('Male', 'Female', 'Other'),
        dob: Joi.string().required(),
        birthplace: Joi.string().required(),
        highSchool: Joi.string().required(),
        briefcase: Joi.array().items(Joi.string()),
        citizenId: Joi.string().required(),
        phone: Joi.string().custom(phoneNumber),
        address: Joi.string().required()
    }).min(1),
};

const deleteStudent = {
    params: Joi.object().keys({
        studentId: Joi.string().custom(objectId),
    }),
};

const getUSer = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};


module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getUSer
};
