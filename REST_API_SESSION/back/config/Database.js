import Sequelize from "sequelize";

const db = new Sequelize("rest_api_session", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
