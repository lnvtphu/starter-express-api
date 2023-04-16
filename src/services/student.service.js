const httpStatus = require('http-status');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = async (studentBody) => {
    if (await Student.isCitizenIdTaken(studentBody.citizenId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Citizen ID already taken');
    }
    return Student.create(studentBody);
};

/**
 * Query for student
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudents = async (filter, options) => {
    const users = await Student.paginate(filter, options);
    return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
    return Student.findById(id);
};

/**
 * Get user by citizenId
 * @param {string} citizenId
 * @returns {Promise<Student>}
 */
const getStudentByEmail = async (citizenId) => {
    return Student.findOne({ citizenId });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Student>}
 */
const updateStudentById = async (userId, updateBody) => {
    const user = await getStudentById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    if (updateBody.email && (await Student.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Citizend ID already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<Student>}
 */
const deleteStudentById = async (userId) => {
    const user = await getStudentById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    await user.remove();
    return user;
};

module.exports = {
    createStudent,
    queryStudents,
    getStudentById,
    getStudentByEmail,
    updateStudentById,
    deleteStudentById,
}