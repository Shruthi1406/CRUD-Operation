import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [values, setValues] = useState({
        
        name: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Log the values before making the POST request
        console.log("Form Values:", values);

        let url = "http://localhost:8080/students";
        axios.post(url, values)
            .then(res => {
                console.log("Response:", res);
                navigate('/');
            })
            .catch(err => console.log("Error:", err));
    }

    return (
        <div className='d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleChange}>
                    <h2>Add Student</h2>
                   
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
                    <button type="submit" className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
