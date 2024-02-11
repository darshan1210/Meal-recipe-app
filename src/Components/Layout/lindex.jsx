import React from 'react'
import Navbar from '../Navbar'
import PrivateRoute from '../Routes/PrivateRoute'

function Layout({ element }) {
    return (
        <PrivateRoute>
            <Navbar />
            {element}
        </PrivateRoute>
    )
}

export default Layout