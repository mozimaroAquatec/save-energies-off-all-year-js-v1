"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergiespaginationSchema = exports.updateEnergieSchema = exports.DateAndTimeSchema = exports.yearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
/**
 * @desc Validates whether the input year is a number or a string.
 * @param year - The year to validate.
 * @returns {Joi.ValidationResult} - The validation result.
 */
/*======= yearSchema ========*/
const yearSchema = (year) => {
    const schema = joi_1.default.object({
        year: joi_1.default.required(),
    });
    return schema.validate(year);
};
exports.yearSchema = yearSchema;
/*=======// yearSchema //========*/
/*======= DateAndTimeSchema ========*/
const DateAndTimeSchema = (obj) => {
    const schema = joi_1.default.object({
        date: joi_1.default.string().required(),
        time: joi_1.default.string().required(),
    });
    return schema.validate(obj);
};
exports.DateAndTimeSchema = DateAndTimeSchema;
/*=======// DateAndTimeSchema //========*/
/*======= DateAndTimeSchema ========*/
const updateEnergieSchema = (obj) => {
    const schema = joi_1.default.object({
        message: joi_1.default.string().required(),
    });
    return schema.validate(obj);
};
exports.updateEnergieSchema = updateEnergieSchema;
/*=======// DateAndTimeSchema //========*/
/*======= EnergiespaginationSchema ========*/
const EnergiespaginationSchema = (obj) => {
    const schema = joi_1.default.object({
        currentPage: joi_1.default.string().required(),
    });
    return schema.validate(obj);
};
exports.EnergiespaginationSchema = EnergiespaginationSchema;
/*=======// EnergiespaginationSchema //========*/
//# sourceMappingURL=energies.shema.js.map