const user_model = require('../model/user_model.js');

const getAllUser = async (req, res) => {
  // get asyncronus
  try {
    const [data] = await user_model.getAllUser();
     res.json({
       message: "get all user sukses",
       data: data,
     });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage:error,
    });
  }

 
};

const createUser = (req, res) => {
  console.log(req.body);

  res.json({
    message: "create user sukses",
    data: req.body,
  });
};

const updateUser = (req, res) => {
  const {id,kode} = req.params;
  console.log(id);

  res.json({
    message: "update user sukses",
    data: {
      id:id,
      kode:kode
    },
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);

  res.json({
    message: "delete user sukses",
  });
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
