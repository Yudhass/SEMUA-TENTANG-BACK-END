const dbPool = require("../config/database");

const getAllUser = () => {
  const SQLQuery = "SELECT * FROM user";
  return dbPool.execute(SQLQuery);
};

const createUser = (body) => {
  const SQLQuery = `INSERT INTO user (nama, alamat) VALUES ('${body.nama}','${body.alamat}')`;
  return dbPool.execute(SQLQuery);
};

const updateUser = (body, idUser) => {
  const SQLQuery = `UPDATE user SET nama='${body.nama}', alamat='${body.alamat}' WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

const deleteUser = (idUser) => {
  const SQLQuery = `DELETE FROM user WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
