const mongoose = require('../config/mongoose').mongoose;
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const parentsSchema = new Schema({
    createdDate: String,
    updatedDate: String,
    fullName: String,
    phone: String,
    dob: String,
    relationship: String,
    job: String,
});

const studentSchema = new Schema({
    studentsNumber: String,
    fullName: String,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: String,
    birthplace: String,
    highSchool: String,
    peoples: String,
    briefcase: [String],
    healthInsurance: String,
    citizenId: { type: String, unique: true },
    licenseDate: String,
    issuedBy: String,
    phone: String,
    address: String,
    province: String,
    district: String,
    ward: String,
    parents: [parentsSchema],
    status: String,
},
{
  timestamps: true
});

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

studentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
studentSchema.set('toJSON', {
    virtuals: true
});

/**
 * Check if citizenId is taken
 * @param {string} citizenId - The student's citizen id
 * @param {ObjectId} [excludeStudentId] - The id of the student to be excluded
 * @returns {Promise<boolean>}
 */
studentSchema.statics.isCitizenIdTaken = async function (citizenId, excludeStudentId) {
    const student = await this.findOne({ citizenId, _id: { $ne: excludeStudentId } });
    return !!student;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
