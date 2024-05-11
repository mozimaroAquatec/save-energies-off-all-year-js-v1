"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const error_handler_1 = __importDefault(require("../utils/error.handler"));
require("dotenv").config();
// Load environment variables from the .env file into process.env
// process.env.NODE_ENV = "development";
if (process.env.NODE_ENV === "development") {
    require("dotenv").config({ path: ".env.development" });
}
// Load environment variables for production
if (process.env.NODE_ENV === "production") {
    require("dotenv").config({ path: ".env.production" });
}
mongoose_1.default.set("strictQuery", true);
const mongo_uri = "mongodb+srv://yassinebazouz:AVBAa3lj6ximvone@mymqttcluster.cd7r5wc.mongodb.net/save_energie?retryWrites=true&w=majority&appName=MyMqttCluster";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || mongo_uri);
        console.log("data base connected successfully");
    }
    catch (error) {
        console.log(new error_handler_1.default(500, "Internal server error"));
        throw new Error(`mongoose connect error is : ${error}`);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connect.db.js.map