const getAllUser = (req, res) => {
  res.json({
    message: "Get user sukses",
  });
};

const createUser = (req, res) => {
  res.json({
    message: "Post user sukses",
  });
};


module.exports ={
    getAllUser,
    createUser,
}