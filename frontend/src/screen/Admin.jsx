import React from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from '../components/Admin/Nav'

export default function Admin() {

    return <>

        <Nav />
        <Outlet />
    </>
}
