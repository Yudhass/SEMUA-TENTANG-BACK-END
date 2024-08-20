import React, {
    useState, useEffect
} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setGender(res.data.gender);
    };

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name, email, gender
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="columns mt-3">
            <div className="column is-half">
                <form onSubmit={updateUser} method="post">
                    <div className="field">
                        <label htmlFor="name" className="label">Name</label>
                        <div className="control">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='name' className="input" name='name' placeholder='Masukkan Nama' />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="email" className="label">Email</label>
                        <div className="control">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="input" name='name' placeholder='Masukkan Email' />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="Gender" className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="gender" id="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className='button is-success'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser