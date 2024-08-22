import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [role, setRole] = useState("");
  const [konfirmasi_password, setKonfirmasiPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${id}`);
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setRole(res.data.data.role);
      } catch (error) {
        console.error("Failed to get product:", error);
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/user/${id}`, {
        name: name,
        email: email,
        password: password,
        konfirmasi_password: konfirmasi_password,
        role: role,
      });
      navigate("/user");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">User</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label htmlFor="" className="label">
                  Name
                </label>
                <div className="control">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Email
                </label>
                <div className="control">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
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
                    value={konfirmasi_password}
                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
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
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      id=""
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
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

export default FormEditUser;
