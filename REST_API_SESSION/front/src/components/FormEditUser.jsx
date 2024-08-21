import React from "react";

const FormEditUser = () => {
  return (
    <div>
      <h1 className="title">User</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <div className="field">
                <label htmlFor="" className="label">
                  Name
                </label>
                <div className="control">
                  <input type="text" className="input" placeholder="Name" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Email
                </label>
                <div className="control">
                  <input type="email" className="input" placeholder="Email" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="*************"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Konfirmasi Password
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="*************"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Role
                </label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="" id="">
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
