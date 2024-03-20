// AuthComponent
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';

export default function AuthComponent() {
    const routeParams = useParams();
    const hashedKey = routeParams.hashedKey as string;
    
    useEffect(() => {
        console.log("Check if hashedKey is valid")
        // if hashedKey is not valid, go to InvalidAuth
        
        // check if username for this has already exists
        // if yes, go to SpotifyDJ
        
        
        console.log('AuthComponent mounted');
    }, [hashedKey]);
    
    if (true) {
        return <Navigate to="/unauthorized" replace />;
    } else {
        return <Navigate to="/signin" replace />;
    }

    if (true) {
        return <Navigate to="/spotify" replace />;
    }
}