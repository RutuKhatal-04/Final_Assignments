"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emplogout = exports.report = exports.create_timesheet = exports.emplogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const Employee_1 = __importDefault(require("../models/Employee"));
const Shift_1 = __importDefault(require("../models/Shift"));
const exceljs_1 = __importDefault(require("exceljs"));
const sequelize_1 = require("sequelize");
const TimeSheet_1 = __importDefault(require("../models/TimeSheet"));
const secret = 'abc@#1234'; // Make sure to store this securely
const emplogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const Emp = yield Employee_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!Emp) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        const isPassword = (yield password) === Emp.password;
        if (!isPassword) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        const payload = {
            id: Emp.id,
            email: Emp.email,
            role: "Employee"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '12h' });
        const empid = Emp.id;
        console.log("Employee id", empid);
        const today = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('YYYY-MM-DD');
        console.log("Employee time in", today);
        const startTime = (0, moment_timezone_1.default)().tz('Asia/Kolkata').toDate();
        const endTime = (0, moment_timezone_1.default)().tz('Asia/Kolkata').toDate();
        const setTime = yield Shift_1.default.create({
            empid,
            startTime,
            endTime,
            actualTime: 0
        });
        res.json({ token, setTime });
    }
    catch (error) {
        console.log("Error during login", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.emplogin = emplogin;
// Assuming you have a Timesheet model
const create_timesheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectName, taskName, fromDate, toDate } = req.body;
    const empid = req.user.id;
    const todayDate = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('YYYY-MM-DD');
    try {
        const shift = yield Shift_1.default.findOne({
            where: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('DATE', sequelize_1.Sequelize.col('startTime')), todayDate),
            attributes: ['id']
        });
        if (!shift) {
            res.status(404).json({ message: "Shift not found for today" });
            return;
        }
        const shiftid = shift.id;
        // Assuming you have a Timesheet model and you want to create a new timesheet entry
        const timesheet = yield TimeSheet_1.default.create({
            projectName,
            taskName,
            fromDate,
            toDate,
            empid,
            shiftid
        });
        res.json({ message: "Timesheet created successfully", timesheet });
    }
    catch (error) {
        console.log("Error creating timesheet", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.create_timesheet = create_timesheet;
const report = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload_startdate, payload_enddate } = req.body;
    // Validate and log the date values
    if (!payload_startdate || !payload_enddate) {
        res.json({ message: "Invalid date range" });
        return;
    }
    console.log(`Start Date: ${payload_startdate}, End Date: ${payload_enddate}`);
    // Convert dates to ISO format if necessary
    const start = new Date(payload_startdate).toISOString();
    const end = new Date(payload_enddate).toISOString();
    const shiftdata = yield Shift_1.default.findAll({
        attributes: ["empid", "startTime", "actualTime"],
        where: {
            startTime: {
                [sequelize_1.Op.between]: [start, end]
            }
        }
    });
    const empdata = yield Employee_1.default.findAll({
        attributes: ["id", "name", "email", "assginedTime"]
    });
    // Create a new workbook and add a worksheet
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet('Shift Report');
    // Add columns to the worksheet
    worksheet.columns = [
        { header: 'empid', key: 'empid', width: 10 },
        { header: 'date', key: 'date', width: 15 },
        { header: 'name', key: 'name', width: 20 },
        { header: 'assigned_hours', key: 'assigned_hours', width: 15 },
        { header: 'actual_hours', key: 'actual_hours', width: 15 },
        { header: 'comparison', key: 'comparison', width: 20 }
    ];
    // Process shift data and add rows to the worksheet
    shiftdata.forEach(shift => {
        var _a;
        const empid = shift.empid;
        const date = new Date(shift.startTime).toISOString().split('T')[0];
        const empdata_forid = empdata.find(emp => emp.id === empid);
        const name = empdata_forid === null || empdata_forid === void 0 ? void 0 : empdata_forid.dataValues.name;
        const assignedTime = empdata_forid === null || empdata_forid === void 0 ? void 0 : empdata_forid.dataValues.assginedTime;
        const actualTime = (_a = shiftdata.find(time => empid === empid)) === null || _a === void 0 ? void 0 : _a.dataValues.actualTime;
        const comp = Math.abs(assignedTime - actualTime);
        let compp = '';
        if (actualTime === 0) {
            compp = `No work done`;
        }
        else if (actualTime < assignedTime) {
            compp = `${comp} hrs less work`;
        }
        else if (actualTime > assignedTime) {
            compp = `${comp} hrs more work`;
        }
        worksheet.addRow({
            empid: empid,
            date: date,
            name: name,
            assigned_hours: assignedTime,
            actual_hours: actualTime,
            comparison: compp
        });
    });
    // Write the workbook to a file
    yield workbook.xlsx.writeFile('shift_report.xlsx');
    console.log("Data has been successfully saved to shift_report.xlsx");
    res.json({ message: "Data has been successfully saved to shift_report.xlsx" });
});
exports.report = report;
const emplogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empid = req.user.id;
    console.log(empid);
    const todayDate = (0, moment_timezone_1.default)().tz('Asia/Kolkata').format('YYYY-MM-DD');
    const shiftdata = yield Shift_1.default.findOne({
        where: {
            empid: empid, [sequelize_1.Op.and]: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('DATE', sequelize_1.Sequelize.col('startTime')), todayDate)
        }
    });
    if (!shiftdata) {
        res.status(404).json({ message: "Shift not found for today" });
        return;
    }
    if (shiftdata.actualTime != 0 || shiftdata.startTime != shiftdata.endTime) {
        res.json({ message: "Already Logout" });
        return;
    }
    // Update the shift end time and actual time
    shiftdata.endTime = (0, moment_timezone_1.default)().tz('Asia/Kolkata').toDate();
    const starthr = shiftdata.startTime.getHours();
    const endhr = shiftdata.endTime.getHours();
    shiftdata.actualTime = endhr - starthr;
    yield shiftdata.save();
    res.json({ message: "Logout successfully" });
});
exports.emplogout = emplogout;
