import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../screen/Home'
import Admin from '../screen/Admin'
import Department from '../screen/Department'
import Login from '../screen/Login'
import ProtectRoute from '../components/ProtectRoute'
import Overview from '../components/Admin/Overview'
import Product from '../components/Admin/Product'
import Gift from '../components/Admin/Gift'
import Employee from '../components/Admin/Employee'
import Cus from '../components/Admin/Cus'

export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<ProtectRoute element={<Admin />} allowedRoles={["admin"]} />} >
                <Route index element={<Overview />} />
                <Route path='product' element={<Product />} />
                <Route path='gift' element={<Gift />} />
                <Route path='employee' element={<Employee />} />
                <Route path='cus' element={<Cus />} />
            </Route>
            <Route path='/depart' element={<ProtectRoute element={<Department />} allowedRoles={["depart"]} />} >
            </Route>
        </Routes>
    )
}
