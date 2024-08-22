import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormAddProduk = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/produk", {
        name: name,
        price: price,
      });
      navigate("/produk"); 
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Add New Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduk}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label htmlFor="" className="label">
                  Produk Name
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
                    Save
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

export default FormAddProduk;
