import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProdectedRoute({toggleModal,children}) {
    const isAuthenticated = localStorage.getItem('authToken');
    const localGoogleToken = localStorage.getItem('googleAuthToken');

    if(isAuthenticated || localGoogleToken){
        return children;
    }
    else{
        toggleModal()
        return <Navigate to='/'/>
    }
    
}
