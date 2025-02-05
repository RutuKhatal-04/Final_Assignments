import { Sequelize} from "sequelize";


const sequelize=new Sequelize("Project3","postgres","postgres@25",{
    host:"localhost",
    dialect:"postgres"
})
const syncDatabase = async () => {
    try {
        await sequelize.sync({alter:true});
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};
syncDatabase();
export default sequelize;