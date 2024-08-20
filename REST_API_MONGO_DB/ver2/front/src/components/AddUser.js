import React, {
    useState
} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users', {
                name,email,gender
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="columns mt-3">
            <div className="column is-half">
                <form onSubmit={saveUser} method="post">
                    <div className="field">
                        <label htmlFor="name" className="label">Name</label>
                        <div className="control">
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id='name' className="input" name='name' placeholder='Masukkan Nama' />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="email" className="label">Email</label>
                        <div className="control">
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id='email' className="input" name='name' placeholder='Masukkan Email' />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="Gender" className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="gender" id="Gender" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser