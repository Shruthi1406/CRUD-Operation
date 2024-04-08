import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/read/` + id)
            .then(res => {
                console.log(res);
                // Update state here
                setValues({
                    name: res.data[0].name,
                    email: res.data[0].email,
                    phone: res.data[0].phone
                });
            })
            .catch(err => console.log(err));
    }, [id]); // Add id as dependency

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/update/' + id, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate} >
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input type='text' value={values.name} placeholder='Enter your name' className='form-control'
                            onChange={e => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email' value={values.email} placeholder="Enter your email" className='form-control'
                            onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label>Phone</label>
                        <input type='tel' value={values.phone} placeholder='Enter your phone number' className='form-control'
                            onChange={e => setValues({ ...values, phone: e.target.value })} />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
