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
    const students = await Student.paginate(filter, options);
    return students;
};

/**
 * Get student by id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
    return Student.findById(id);
};

/**
 * Get student by citizenId
 * @param {string} citizenId
 * @returns {Promise<Student>}
 */
const getStudentByCitizenId = async (citizenId) => {
    return Student.findOne({ citizenId });
};

/**
 * Update student by id
 * @param {ObjectId} studentId
 * @param {Object} updateBody
 * @returns {Promise<Student>}
 */
const updateStudentById = async (studentId, updateBody) => {
    const student = await getStudentById(studentId);
    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    if (updateBody.email && (await Student.isEmailTaken(updateBody.email, studentId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Citizend ID already taken');
    }
    Object.assign(student, updateBody);
    await student.save();
    return student;
};

/**
 * Delete student by id
 * @param {ObjectId} studentId
 * @returns {Promise<Student>}
 */
const deleteStudentById = async (studentId) => {
    const student = await getStudentById(studentId);
    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    await student.deleteOne();
    return student;
};

module.exports = {
    createStudent,
    queryStudents,
    getStudentById,
    getStudentByCitizenId,
    updateStudentById,
    deleteStudentById,
}