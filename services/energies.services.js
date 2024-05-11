"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnergie = exports.createAllDatesAndHoursOfYear = void 0;
const energie_model_1 = __importDefault(require("../models/energie.model"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
                console.log(`hour: ${hour}`);
                await energie_model_1.default.create({
                    year,
                    date,
                    energie: "00.00:000",
                    time: hour,
                    message: "00.00:000.00:00:00",
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
        const dateString = new Date();
        const gmtTime = new Date(dateString.toUTCString());
        /*
    
    get hout gmt+1
    
    */
        // Get the current date and time
        const now = new Date();
        // Get the UTC time in milliseconds
        const utcTime = now.getTime();
        // Get the local time zone offset in minutes
        const localOffset = now.getTimezoneOffset();
        // Convert the local time to GMT+1 (CET) time
        const gmtPlusOneTime = utcTime + (localOffset + 60) * 60 * 1000;
        // Create a new Date object for GMT+1 time
        const gmtPlusOneDate = new Date(gmtPlusOneTime);
        // Get the hour in GMT+1
        const hourInGMTPlusOne = gmtPlusOneDate.getHours();
        console.log("Current hour in GMT+1:", hourInGMTPlusOne);
        // Format the date as "YYYY/M/D"
        const date = `${gmtTime.getFullYear()}/${gmtTime.getMonth() + 1}/${gmtTime.getDate()}`;
        const time = `${hourInGMTPlusOne}`;
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
const timezones = [
    "Europe/Brussels",
    "Europe/Copenhagen",
    "Europe/Madrid",
    "Europe/Paris",
];
timezones.forEach((timezone) => {
    const now = (0, moment_timezone_1.default)().tz(timezone);
    console.log(`Current hour in ${timezone}: ${now.format("HH:mm")}`);
});
//# sourceMappingURL=energies.services.js.map