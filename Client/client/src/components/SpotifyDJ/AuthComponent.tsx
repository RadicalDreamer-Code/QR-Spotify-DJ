import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import { checkHashedKey } from '../../api/account';
import { AxiosResponse } from 'axios';

export default function AuthComponent() {
    const routeParams = useParams();
    const hashedKey = routeParams.hashedKey as string;

    useEffect(() => {
        console.log("Check if hashedKey is valid")
        // if hashedKey is not valid, go to InvalidAuth

        // wait 100ms
        

        checkHashedKey(hashedKey).then((res) => {
            console.log(res)
            if (res.valid) {
                // setValidHash(hashedKey);
                // Store validHash in local storage
                localStorage.setItem('validHash', hashedKey);   
                // Navigate to the appropriate route after successful validation
                if (!res.username) 
                    window.location.replace('/signin');
                else
                    window.location.replace('/spotify');
            } else {
                console.log("hashedKey is invalid")
                // setValidHash("");
                // Store validHash in local storage
                localStorage.setItem('validHash', "");
                console.error("hashedKey is invalid");
                window.location.replace('/unauthorized');
            }
        }).catch((err) => {
            console.log("aslkdaslkasdls")
            console.error(err);
            window.location.replace('/unauthorized');
        });
        
        console.log('AuthComponent mounted');
    }, []);

    // Render a loading indicator or placeholder while checking the hash
    return <div>Loading...</div>;
}
