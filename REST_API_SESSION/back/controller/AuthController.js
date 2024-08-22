import User from "../model/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Email anda tidak terdaftar" });
    }
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({ msg: "Password yang anda masukkan salah" });
    }
    req.session.userId = user.uuid; // Perbaiki untuk mendapatkan UUID dari user yang benar
    const { uuid, name, email, role } = user;

    res.status(200).json({ uuid, name, email, role }); // Perbaiki format json
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error: ${error.message}` }); // Perbaiki format pesan error
  }
};


export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User tidak ditemukan" });
  }
  res.status(200).json(user);
};


export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Tidak dapat logout" });
    }

    // Hapus cookie sesi
    res.clearCookie("connect.sid"); // Pastikan nama cookie sama dengan yang digunakan di session config

    res.status(200).json({ msg: "Anda telah logout" });
  });
};
