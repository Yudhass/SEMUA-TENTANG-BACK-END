import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduk = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProdukById = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/produk/${id}`);
        setName(res.data.data.name);
        setPrice(res.data.data.price);
      } catch (error) {
        console.error("Failed to get product:", error);
      }
    };
    getProdukById();
  },[id]);

  const updateProduk = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/produk/${id}`, {
        name: name,
        price: price,
      });
      navigate("/produk");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Update Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduk}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label htmlFor="" className="label">
                  Preoduk Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Produk Name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Produk Price
                </label>
                <div className="control">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input"
                    placeholder="Produk Price"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduk;
