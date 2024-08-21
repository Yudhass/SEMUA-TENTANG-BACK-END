import React from "react";

const FormAddProduk = () => {
  return (
    <div>
      <h1 className="title">Produk</h1>
      <h2 className="subtitle">Add New Produk</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label htmlFor="" className="label">
                  Preoduk Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Produk Name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Preoduk Price
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Produk Price"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success">Save</button>
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
