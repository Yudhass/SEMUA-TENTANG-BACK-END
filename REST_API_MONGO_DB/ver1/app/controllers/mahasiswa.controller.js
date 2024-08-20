const db = require("../models")
const Mahasiswa = db.mahasiswa

exports.findAll = (req, res) => {
    Mahasiswa.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
}

exports.show = (req, res) => {
    const id = req.params.id;
    Mahasiswa.findById(id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
}

exports.create = (req, res) => {
    // setingan tanggal lahir karna type data date
    req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)
    Mahasiswa.create(req.body)
        .then(() => { res.send({ message: "Data Berhasil Disimpan" }) })
        .catch(err => res.status(500).send({ message: err.message }));
}

exports.update = (req, res) => {
    const id = req.params.id;
    // setingan tanggal lahir karna type data date
    req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)

    Mahasiswa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Tidak Dapat Mengubah Data" });
            }
            res.send({ message: "Data Berhasil DiUbah" });
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Mahasiswa.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Data Tidak Ditemukan" });
            }
            res.send({ message: "Data Berhasil Dihapus" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}