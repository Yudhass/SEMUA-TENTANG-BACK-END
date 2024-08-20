// UserList.js
import React, {
    useState,
    useEffect
} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const res = await axios.get('http://localhost:5000/users');
        setUser(res.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-4">
            <div className="column is-half">
                <Link to="/add" className="button is-info is-small mr-2">Add User</Link>
                <table className="table is-striped is-fullwidth mt-5">
                    <thead className="">
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link to={`edit/${user._id}`} className="button is-info is-small mr-2">Edit</Link>
                                    <button onClick={() => deleteUser(user._id)} className="button is-danger is-small">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList