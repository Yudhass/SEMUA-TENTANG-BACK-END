import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProdukList = () => {
  const [produk, setProduk] = useState([]);
  useEffect(() => {
    getProduks();
  }, []);

  const getProduks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/produk");
      setProduk(res.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const deleteProduk = async (produkId) => {
    try {
      await axios.delete(`http://localhost:5000/produk/${produkId}`);
      getProduks();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">List Of Produk</h2>
      <Link to="/produk/add" className="button is-primary mb-2">Add New</Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Produk Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((data, index) => (
            <tr key={data.uuid}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>{data.user.name}</td>
              <td>
                <Link
                  to={`/produk/edit/${data.uuid}`}
                  className="button is-small is-info mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    deleteProduk(data.uuid);
                  }}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukList;
