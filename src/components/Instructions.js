import React, { useContext } from 'react'
import { userContext } from './UserContext'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';



//userFirstname, setUserFirstname

export default function Instructions() {

    const myContext = useContext(userContext);
    const navigate = useNavigate();


    return (
        <div>
            <h1>Hello {myContext.userState.FirstName} {myContext.userState.LastName}</h1>
            <p>You have to insert your details into the form.</p>
            <p>If you have any children,please enter their details,too.</p>
            

            <Button color="primary" variant="outlined" onClick={() => {
                navigate(`/`)
            }}>
                Back to home
            </Button>
        </div>
    )

}