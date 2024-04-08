import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Home(){
    const [studentdata, setStudentData]=useState()
   
        
        
      
   
    const handleApi=()=>{
        let url="http://localhost:8080/Students";
        axios.get(url)
        .then(response => {
            setStudentData(response.data)
          console.log('Response data:', studentdata);

        },)
        .catch(error => {
      
          console.error('Error fetching data:', error);
        });


    }
   
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
        .then(res => {
           
            handleApi();
            console.log('Student deleted successfully:', res.data);
        })
        .catch(error => {
            console.error('Error deleting student:', error);
        });
    }
    
    
    
//console.log(data)
    return(
      
        
      <div className='d-flex vh-100 vw-100 bg-secondary justify-content-center align-items-center'>
       
        <div className='w-50 bg-white rounded p-3'>
            <h2>Student List</h2>
            <div className='d-flex justify-content-end'>
                <Link to='/create' className='btn-btn-success'>Create +</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     {studentdata?.map((students, index)=>{
                        return <tr key={index}>
                            <td>{students.id}</td>
                            <td>{students.name}</td>
                            <td>{students.email}</td> 
                            <td>{students.phone}</td>
                            <td>
                            <Link to={`/read/${students.id}`} type="button mx-5 p-4 shru" className="btn btn-primary">Read</Link>
                            <Link to={`/edit/${students.id}`}  type="button mx-5  p-4 shru" className="btn btn-primary">Update</Link>
                            <button onClick={()=>handleDelete(students.id)} type="button mx-5 p-4 shru" className="btn btn-secondary">Delete</button>
                            </td>

                        </tr>
                    })} 
                </tbody>
                
            </table>
            <button onClick={handleApi}>Click Me</button>
        </div>
      </div>
    )
}
export default Home;