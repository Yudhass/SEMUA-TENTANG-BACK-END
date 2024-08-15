const user_model = require("../model/user_model.js");

const getAllUser = async (req, res) => {
  // get asyncronus
  try {
    const [data] = await user_model.getAllUser();
    res.status(200).json({
      message: "get all user sukses",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const createUser = async (req, res) => {
  const { body } = req;
  try {
    await user_model.createUser(body);
    res.status(201).json({
      message: "create user sukses",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await user_model.updateUser(body, id);
    res.json({
      message: "update user sukses",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user_model.deleteUser(id);
    res.json({
      message: "delete user sukses",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
