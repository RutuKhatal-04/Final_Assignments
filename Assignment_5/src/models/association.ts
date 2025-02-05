import sequelize from "../database/config";
import Employee from "./Employee";
import Shift from "./Shift";
import Timesheet from "./TimeSheet";

Employee.hasMany(Shift,{foreignKey:'empid'});
Shift.belongsTo(Employee,{foreignKey:'empid'});

Shift.hasOne(Timesheet,{foreignKey:'shift_id'});
Timesheet.belongsTo(Shift,{foreignKey:'shift_id'});