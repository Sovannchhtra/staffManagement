import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
     const [staffs , setStaffs] = useState([]);
     useEffect(()=>{
          axios.get('http://localhost:8081/api/v1')
          .then((res)=>{
               setStaffs(res.data.staffs)
          })
          .catch((err)=>console.log(err))
     },[]);

     const handleDelete =(id)=>{
          axios.delete('http://localhost:8081/api/v1/delete/'+id)
               .then(()=> window.location.reload())
               .catch((err)=>console.log(err));
     }

     return (
          <>
          <div className='container'>
               <div className='d-flex mt-5 justify-content-between'>
                    <Link to="/create" className="btn btn-success">+ Add</Link>
                    <Link to="/search" className="btn btn-secondary">Search</Link>
               </div>
              <table className="table table-bordered mt-3 m-auto align-middle" style={{tableLayout: "fixed"}}>
               <thead>
                    <tr>
                         <th scope="col" style={{width:'100px'}}>STAFF ID</th>
                         <th scope="col">FULL NAME</th>
                         <th scope="col">GENDER</th>
                         <th scope="col">BIRTH DAY</th>
                         <th scope="col" style={{width:'160px'}}>ACTION</th>
                    </tr>
               </thead>
               <tbody>
                    {
                         staffs.map((staff,i)=>
                         <tr key={i}>
                              <th>{staff.staffID}</th>
                              <td>{staff.fullName}</td>
                              <td>{staff.gender == '1' ? 'Male' : 'Female'}</td>
                              <td>{staff.birthDay}</td>
                              <td>
                                   <Link to={`/update/${staff.staffID}`} className='btn btn-info'>Edit</Link>
                                   <button className='btn btn-danger mx-2' onClick={()=>handleDelete(staff.staffID)}>Delete</button>
                              </td>
                         </tr>)
                    }
               </tbody>
               </table>
               </div>
          </>
     );
}

export default Home;