import express from 'express';
import { createStaff, deleteStaff, editStaff, getStaff, searchStaff, updateStaff } from '../controllers/staff.controller';
const route = express();

route.get('/',getStaff);
route.post('/create',createStaff);
route.get('/edit/:id',editStaff)
route.post('/update/:id',updateStaff)
route.delete('/delete/:id',deleteStaff);
route.post('/search',searchStaff);

export default route;