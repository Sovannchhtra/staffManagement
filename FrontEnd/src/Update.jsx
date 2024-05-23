import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
     const {id} = useParams();
     
     const [values , setValues] = useState({
          name:'',
          gender:'',
          birthday:''
     });
     const navigate = useNavigate();
     const handleSubmit = (e) =>{
          e.preventDefault();
          axios.post(`http://localhost:8081/api/v1/update/${id}`,{...values})
               .then(res => navigate('/'))
               .catch(err => console.log(err))
     }
     useEffect(()=>{
          axios.get(`http://localhost:8081/api/v1/edit/${id}`)
          .then((res)=>setValues({
               ...values,
               name:res.data.staffs.fullName,
               gender:res.data.staffs.gender,
               birthday:res.data.staffs.birthDay

          }))
          .catch((err)=>console.log(err))
     },[]);
     return (
          <div className='container p-3'>
               <h1>Update Staffs</h1>
               <form className='mt-4 w-50' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>FULL NAME</label>
                         <input type="text" 
                              className='form-control'
                              placeholder='fullname'
                              value={values.name}
                              onChange={(e)=> setValues({...values,name:e.target.value})}
                         />
                    </div>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>GENDER</label>
                         <select
                              className='form-control'
                              onChange={(e) => setValues({...values, gender:e.target.value})}
                         >
                              <option value="1" selected={values.gender == '1'}>Male</option>
                              <option value="2" selected={values.gender == '2'}>Female</option>
                         </select>
                    </div>
                    <div className='mb-4'>
                         <label htmlFor="" className='text-secondary'>BIRTH DAY</label>
                         <input type="date" 
                              className='form-control'
                              value={values.birthday}
                              onChange={(e)=> setValues({...values,birthday:e.target.value})}
                         />
                    </div>
                    <div className='mb-4 d-flex gap-1'>
                         <Link to={'/'} className='btn btn-danger'>Cancel</Link>
                         <button type='submit' className='btn btn-primary'>Edit</button>
                    </div>
               </form>
          </div>
     );
}

export default Update;