import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List Of User</h2>
      <Link to="/user/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <tr key={data.uuid}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td>
                <Link
                  to={`/user/edit/${data.uuid}`}
                  className="button is-small is-info mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    deleteUser(data.uuid);
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

export default UserList;
