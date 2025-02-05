import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import Employee from '../models/Employee';
import Shift from '../models/Shift';
import exceljs from 'exceljs'
import { Op, Sequelize } from 'sequelize';

import Timesheet from '../models/TimeSheet';

const secret = 'abc@#1234';

export const emplogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const Emp = await Employee.findOne({
            where: {
                email: email
            }
        });

        if (!Emp) {
            res.status(401).json({ message: "Invalid Credentials" });
            return ;
        }

        const isPassword = await password===Emp.password;
        if (!isPassword) {
            res.status(401).json({ message: "Invalid Credentials" });
            return ;
        }

        const payload = {
            id: Emp.id,
            email: Emp.email,
            role: "Employee"
        };

        const token = jwt.sign(payload, secret, { expiresIn: '12h' });

        const empid = Emp.id;
        console.log("Employee id", empid);

        const today = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
        console.log("Employee time in", today);

        const startTime = moment().tz('Asia/Kolkata').toDate();
        const endTime = moment().tz('Asia/Kolkata').toDate();

        const setTime = await Shift.create({
            empid,
            startTime,
            endTime,
            actualTime: 0
        });

        res.json({ token, setTime });

    } catch (error) {
        console.log("Error during login", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





export const create_timesheet = async (req: Request, res: Response) => {
    const { projectName, taskName, fromDate, toDate } = req.body;
    const empid = (req as any).user.id;
    const todayDate = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');

    try {
        const shift = await Shift.findOne({
            where: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('startTime')),
                todayDate
            ),
            attributes: ['id']
        });

        if (!shift) {
           res.status(404).json({ message: "Shift not found for today" });
           return;
        }

        const shiftid = shift.id;

       
        const timesheet = await Timesheet.create({
            projectName,
            taskName,
            fromDate,
            toDate,
            empid,
            shiftid
        });

        res.json({ message: "Timesheet created successfully", timesheet });

    } catch (error) {
        console.log("Error creating timesheet", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




export const report = async (req:Request, res:Response) => {
    const { payload_startdate, payload_enddate } = req.body;

  
    if (!payload_startdate || !payload_enddate) {
        res.json({ message: "Invalid date range" });
        return;
    }

    console.log(`Start Date: ${payload_startdate}, End Date: ${payload_enddate}`);

 

        const start = new Date(payload_startdate).toISOString();
        const end = new Date(payload_enddate).toISOString();

        const shiftdata = await Shift.findAll({
            attributes: ["empid", "startTime", "actualTime"],
            where: {
                startTime: {
                    [Op.between]: [start, end]
                }
            }
        });

    const empdata = await Employee.findAll({
        attributes: ["id", "name", "email", "assginedTime"]
    });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Shift Report');

    worksheet.columns = [
        { header: 'empid', key: 'empid', width: 10 },
        { header: 'date', key: 'date', width: 15 },
        { header: 'name', key: 'name', width: 20 },
        { header: 'assigned_hours', key: 'assigned_hours', width: 15 },
        { header: 'actual_hours', key: 'actual_hours', width: 15 },
        { header: 'comparison', key: 'comparison', width: 20 }
    ];

    shiftdata.forEach(shift => {
        const empid = shift.empid;
        const date = new Date(shift.startTime).toISOString().split('T')[0];
        const empdata_forid = empdata.find(emp => emp.id === empid);
        const name = empdata_forid?.dataValues.name;
        const assignedTime = empdata_forid?.dataValues.assginedTime;
        const actualTime = shiftdata.find(time=>empid===empid)?.dataValues.actualTime;
        const comp = Math.abs(assignedTime - actualTime);
        let compp = '';

        if (actualTime === 0) {
            compp = `No work done`;
        } else if (actualTime < assignedTime) {
            compp = `${comp} hrs less work`;
        } else if (actualTime > assignedTime) {
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
    await workbook.xlsx.writeFile('shift_report.xlsx');

    console.log("Data has been successfully saved to shift_report.xlsx");

    res.json({ message: "Data has been successfully saved to shift_report.xlsx" });
};


export const emplogout=async(req:Request,res:Response)=>{
    const empid=(req as any).user.id;
    console.log(empid);
    const todayDate = moment().tz('Asia/Kolkata').format('YYYY-MM-DD');
    const shiftdata=await Shift.findOne({
        where:{
            empid:empid,[Op.and]: Sequelize.where(
                Sequelize.fn('DATE', Sequelize.col('startTime')),
                todayDate
            )
        }

    })
    if (!shiftdata) {
        res.status(404).json({ message: "Shift not found for today" });
        return;
    }
    if(shiftdata.actualTime!=0 || shiftdata.startTime!=shiftdata.endTime){
        res.json({message:"Already Logout"});
        return;
    }

    shiftdata.endTime = moment().tz('Asia/Kolkata').toDate();

    const starthr=shiftdata.startTime.getHours();
    const endhr=shiftdata.endTime.getHours();
    shiftdata.actualTime=endhr-starthr;
    await shiftdata.save();
    res.json({message:"Logout successfully"})

}
