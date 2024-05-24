import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useReactToPrint} from 'react-to-print'

function Search() {
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

     // print PDF
     const conponentPDF = useRef();
     const generatePDF=useReactToPrint({
          content: () => conponentPDF.current,
          documentTitle: 'staff management system',
          onAfterPrint: ()=>alert('Staff saved in PDF')
     });

     // search 
     const [formData, setFormData] = useState({
          staffId: '',
          gender: '',
          fromBirthday: '',
          toBirthday: '',
     });

     const handleSearch = (e) => {
          e.preventDefault();
          axios.post('http://localhost:8081/api/v1/search',{...formData})
          .then((res)=>{
               setStaffs(res.data.staffs)
          })
          .catch((err)=>console.log(err))
     };
     return (
          <div className='container'>
               <div className='d-flex mt-4 justify-content-between'>
                    <Link to="/" className="btn btn-outline-info">Back to list staff</Link>
               </div>
               <form onSubmit={handleSearch} className='mt-3'>
                    <div>
                         <div className="row mb-4">
                              <div className="col-6">
                                   <label htmlFor="" className='text-secondary'>SEARCH BY ID</label>
                                   <input onChange={(e)=>setFormData({...formData,staffId:e.target.value})}type="text" placeholder='Staff ID' className="form-control" />
                              </div>
                         </div>
                         <div className="row mb-4">
                         <div className="col-6">
                                   <label htmlFor="" className='text-secondary'>SEARCH BY GENDER</label>
                                   <select onChange={(e)=>setFormData({...formData,gender:e.target.value})}
                                    className='form-control'>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                   </select>
                              </div>
                         </div>
                         <div className="row mb-4">
                              <div className="col-6">
                                   <label htmlFor="" className='text-secondary'>BIRTHDAY FROM:</label>
                                   <input onChange={(e)=>setFormData({...formData,fromBirthday:e.target.value})} type="date" className="form-control" />
                              </div>
                              <div className="col-6">
                                   <label htmlFor="" className='text-secondary'>BIRTHDAY TO:</label>
                                   <input onChange={(e)=>setFormData({...formData,toBirthday:e.target.value})} type="date" className="form-control" />
                              </div>
                         </div>
                         <button className='btn btn-primary float-end mb-3'>Search</button>
                    </div>
               </form>

               <div ref={conponentPDF}>
              <table className="table table-bordered mt-5 m-auto align-middle" style={{tableLayout: "fixed"}}>
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
               <button onClick={generatePDF} className='btn btn-success mt-4 float-end'>Export PDF</button>
          </div>
     );
}

export default Search;