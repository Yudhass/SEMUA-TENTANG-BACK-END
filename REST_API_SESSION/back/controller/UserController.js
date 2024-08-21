import { where } from "sequelize";
import User from "../model/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json({
      msg: "Data user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error : ${error}`);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Data user tidak ditemukan" });
    }
    res.status(200).json({
      msg: "Data user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error : ${error}`);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, konfirmasi_password, role } = req.body;
  if (password !== konfirmasi_password) {
    return res
      .status(400)
      .json({ msg: "Password dan konfirmasi password harus sama" });
  }
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error : ${error}`);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, konfirmasi_password, role } = req.body;

  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Data user tidak ditemukan" });
    }

    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = user.password;
    } else {
      if (password !== konfirmasi_password) {
        return res
          .status(400)
          .json({ msg: "Password dan konfirmasi password harus sama" });
      }
      hashPassword = await argon2.hash(password);
    }

    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        }
      }
    );
    res.status(200).json({ msg: "Update data user berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error : ${error}`);
  }
};
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) {
    return res.status(404).json({ msg: "Data user tidak ditemukan" });
  }

  try {
    await User.destroy({where: {
        id: user.id
      },
    });
    res.status(200).json({ msg: "Delete data user berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(`Error : ${error}`);
  }
};
