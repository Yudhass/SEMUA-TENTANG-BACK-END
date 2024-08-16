// controllers/petugasController.js
const Petugas = require("../models").Petugas; // Sesuaikan path sesuai struktur proyek

const getAllPetugas = async (req, res) => {
  try {
    const petugas = await Petugas.findAll();
    res.status(200).json(petugas);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};

const getPetugasById = async (req, res) => {
  const { id } = req.params;

  try {
    // ambil data
    const petugas = await Petugas.findByPk(id);
    // cek data
    if (!petugas) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(petugas);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: error });
  }
};

const createPetugas = async (req, res) => {
  const { body } = req;

  // Debug: Cek body yang diterima
  console.log("Received body:", body);

  try {
    // Cek apakah body kosong atau atribut penting tidak ada
    if (!body.nama || !body.instansi || !body.no_telpon) {
      return res.status(400).json({ message: "Input tidak boleh kosong" });
    }

    // Buat data petugas
    await Petugas.create({
      nama: body.nama,
      instansi: body.instansi,
      no_telpon: body.no_telpon,
    });

    // Respon sukses
    res.status(201).json({
      message: "Data berhasil disimpan",
      data: body,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const updatePetugasById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    // Validasi input
    if (!body.nama || !body.instansi || !body.no_telpon) {
      return res.status(400).json({ message: "Input tidak boleh kosong" });
    }

    // Ambil data petugas berdasarkan ID
    const dataPetugas = await Petugas.findByPk(id);

    // Cek apakah data petugas ditemukan
    if (!dataPetugas) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Update data petugas
    await Petugas.update(
      {
        nama: body.nama,
        instansi: body.instansi,
        no_telpon: body.no_telpon,
      },
      {
        where: {
          id: id,
        },
      }
    );

    // Respon sukses
    res.status(201).json({
      message: "Data berhasil diubah",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const deletePetugasById = async (req, res) => {
  const { id } = req.params;
  try {
    // Mengambil data petugas berdasarkan ID
    const dataPetugas = await Petugas.findByPk(id);

    // Cek jika data tidak ditemukan
    if (!dataPetugas) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Menghapus data petugas
    await Petugas.destroy({
      where: {
        id: id,
      },
    });

    // Respon sukses
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};


module.exports = {
  getAllPetugas,
  getPetugasById,
  createPetugas,
  updatePetugasById,
  deletePetugasById
};
