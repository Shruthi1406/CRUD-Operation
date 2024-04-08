import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState([null]);

    useEffect(() => {
        axios.get(`http://localhost:8080/read/` + id)
            .then(res => {
                console.log(res)
                setStudent(res.data[0])
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='d-flex vh-100 vw-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='p-2'>
                <h2>Student Detail</h2>
              
                    
                       <h2>id:{student.id}</h2>
                        <h2>Name:{student.name}</h2>
                        <h2>Email:{student.email}</h2>
                        <h2>Phone:{student.phone}</h2>
                        </div>
                
                <Link to='/' className='btn btn-primary me-2'>Back</Link>
                <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    );
}

export default Read;
