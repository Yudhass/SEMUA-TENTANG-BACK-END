const User = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const data_user = await User.findAll({
      attributes: ["id", "nama", "email"],
    });
    res.status(200).json({ message: "Data user", data: data_user });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};

const register = async (req, res) => {
  const { nama, email, password, konfirmasi_password } = req.body;
  if (password !== konfirmasi_password) {
    return res.status(400).json({
      message: "Password dan konfirmasi password harus sama",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      nama: nama,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ message: "Register berhasil" });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    if (user.length === 0) {
      return res.status(404).json({ message: "Email tidak terdaftar" });
    }
    const {
      id: userId,
      nama: userNama,
      email: userEmail,
      password: userPassword,
    } = user[0];
    const match = await bcrypt.compare(password, userPassword);
    if (!match) {
      return res.status(400).json({ message: "Password anda salah" });
    }

    const accessToken = jwt.sign(
      {
        userId,
        userNama,
        userEmail,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );

    const refreshToken = jwt.sign(
      {
        userId,
        userNama,
        userEmail,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      // data yang di update
      { refresh_token: refreshToken },
      //   kondisi nya
      {
        where: {
          id: userId,
        },
      }
    );

    // res.status(200).json({
    //   message: "Login berhasil",
    //   data: user,
    // });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure:true
    });

    res.status(200).json({
      message: "Login berhasil",
      data: accessToken,
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};


const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) {
        return res.sendStatus(403);
      }
      const { id: userId, nama: userNama, email: userEmail } = user[0];

      const accessToken = jwt.sign(
        {
          userId,
          userNama,
          userEmail,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60s",
        }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};


module.exports = {
  getUser,
  register,
  login,
  refreshToken,
};
