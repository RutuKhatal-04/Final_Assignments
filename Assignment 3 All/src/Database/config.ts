import { Sequelize} from "sequelize";

const sequelize=new Sequelize("postgres","postgres","postgres@25",{
    host:"localhost",
    dialect:"postgres"
})

export default sequelize;