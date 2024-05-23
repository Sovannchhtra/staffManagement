
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
     const [values , setValues] = useState({
          name:"",
          gender:'1',
          birthday:""
     });
     const navigate = useNavigate();
     const handleSubmit = (e) =>{
          e.preventDefault();
          axios.post('http://localhost:8081/api/v1/create',{...values})
               .then(res => navigate('/'))
               .catch(err => console.log(err))
     }
     return (
          <div className='container p-3'>
               <h1>Create Staffs</h1>
               <form className='mt-4 w-50' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>FULL NAME</label>
                         <input type="text" 
                              className='form-control'
                              placeholder='fullname'
                              onChange={(e)=> setValues({...values,name:e.target.value})}
                         />
                    </div>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>GENDER</label>
                         <select
                              className='form-control'
                              onChange={(e) => setValues({...values, gender:e.target.value})}
                         >
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                         </select>
                    </div>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>BIRTH DAY</label>
                         <input type="date" 
                              className='form-control'
                              onChange={(e)=> setValues({...values,birthday:e.target.value})}
                         />
                    </div>
                    <div className='mb-4 d-flex gap-1'>
                         <Link to={'/'} className='btn btn-danger'>Cancel</Link>
                         <button type='submit' className='btn btn-primary'>Save</button>
                    </div>
               </form>
          </div>
     );
}

export default Create;