"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnergie = exports.createAllDatesAndHoursOfYear = void 0;
const energie_model_1 = __importDefault(require("../models/energie.model"));
const datetime_1 = __importDefault(require("../utils/datetime"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
/**
 * @desc Creates energy records for all dates and hours of a given year.
 * @param year - The year for which to generate energy records.
 * @access PUBLIC
 */
const createAllDatesAndHoursOfYear = async (year) => {
    try {
        const startDate = new Date(year, 0, 1); // January 1st of the given year
        const endDate = new Date(year, 11, 31); // December 31st of the given year
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            const date = `${year}/${month}/${day}`;
            console.log(`date: ${year}/${month}/${day}`);
            // Log the hours from 0 to 23
            for (let hour = 0; hour < 24; hour++) {
                // console.log(` hour < 10: ${hour < 10}`);
                // Extract hour and format it with leading zero if necessary
                const formattedHour = hour < 10 ? "0" + hour : hour;
                console.log(` hour : ${formattedHour}`);
                await energie_model_1.default.create({
                    year,
                    date,
                    time: formattedHour,
                });
            }
            // Add a separator for the next day
            console.log("\nnext day\n");
        }
    }
    catch (error) {
        throw new error_handler_1.default(500, `createAllDatesAndHoursOfYear : ${error}`);
    }
};
exports.createAllDatesAndHoursOfYear = createAllDatesAndHoursOfYear;
/**
 * @desc Update Helioss by ID
 * @param message - The message containing energy data
 * @returns {Promise<void>}
 */
const updateEnergie = async function (message) {
    try {
        // Get the current date and time
        const currentDate = (0, datetime_1.default)();
        // Format the date as "YYYY/M/D"
        const date = `${currentDate.currentYear}/${currentDate.currentMonth}/${currentDate.currentDay}`;
        const time = `${currentDate.formattedHour}`;
        // Extract energy data from the message
        let energie = message.toString().slice(0, 9);
        if (energie[energie.length - 1] === ".") {
            energie = energie.slice(0, energie.length - 2);
        }
        try {
            // Update the Energies collection in MongoDB
            await energie_model_1.default.updateOne({ $and: [{ time }, { date }] }, // Filter criteria
            {
                energie,
                message,
            } // Update data
            );
            console.log("Update the Energies collection in MongoDB");
        }
        catch (error) {
            // Handle MongoDB update error
            console.error("Error update energie to MongoDB:", error);
            throw new error_handler_1.default(500, `updateEnergie error: ${error}`);
        }
    }
    catch (error) {
        // Handle other errors
        throw new error_handler_1.default(500, `updateEnergie error: ${error}`);
    }
};
exports.updateEnergie = updateEnergie;
//# sourceMappingURL=energies.services.js.map