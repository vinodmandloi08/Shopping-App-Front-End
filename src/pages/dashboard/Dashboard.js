import React from 'react'
import { Route } from 'react-router'
import User from './User'
import Admin from './Admin'

const Dashboard = () => {
    return (
        <>
            <Route path='/user' element={<User/>} />
            <Route path='/admin' element={<Admin/>} />
        </>
    )
}

export default Dashboard