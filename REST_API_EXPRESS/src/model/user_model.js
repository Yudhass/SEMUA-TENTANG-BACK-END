const dbPool = require("../config/database");

const getAllUser = () => {
  const SQLQuery = "SELECT * FROM user";
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUser,
};
