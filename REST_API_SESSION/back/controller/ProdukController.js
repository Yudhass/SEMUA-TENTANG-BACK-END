import Produk from "../model/ProdukModel.js";
import User from "../model/UserModel.js";
import { Op, where } from "sequelize";

export const getProduk = async (req, res) => {
  try {
    if (req.role === "admin") {
      const data = await Produk.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status("200").json({ msg: "Data produk", data: data });
    } else {
      const data = await Produk.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status("200").json({ msg: "Data produk", data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `${error}` });
  }
};

export const getProdukById = async (req, res) => {
  const uuid = req.params.id;
  try {
    const data_produk = await Produk.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!data_produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (req.role === "admin") {
      const data = await Produk.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: data_produk.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status("200").json({ msg: "Data produk", data: data });
    } else {
      const data = await Produk.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: data_produk.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status("200").json({ msg: "Data produk", data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `${error}` });
  }
};

export const createProduk = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Produk.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Produk berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `${error}` });
  }
};

export const updateProduk = async (req, res) => {
  const { name, price } = req.body;
  const uuid = req.params.id;
  try {
    const data = await Produk.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!data) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (req.role === "admin") {
      await Produk.update(
        {
          name: name,
          price: price,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
    } else {
      if (req.userId !== data.userId) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
      await Produk.update(
        {
          name: name,
          price: price,
        },
        {
          where: {
            [Op.and]: [{ id: data.id }, { userId: req.userId }],
          },
        }
      );
    }
    return res.status(200).json({ msg: "Data berhasil diubah" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `${error}` });
  }
};

export const deleteProduk = async (req, res) => {
  const uuid = req.params.id;
  try {
    const data = await Produk.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!data) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (req.role === "admin") {
      await Produk.destroy({
        where: {
          id: data.id,
        },
      });
    } else {
      if (req.userId !== data.userId) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
      await Produk.destroy({
        where: {
          [Op.and]: [{ id: data.id }, { userId: req.userId }],
        },
      });
    }
    return res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `${error}` });
  }
};
