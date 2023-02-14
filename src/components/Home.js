import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';



export default function Home() {
    const navigate = useNavigate();

    return (
        <>
        <h1>Welcome</h1>

            <Button color="primary" variant="outlined" onClick={() => {
                navigate(`/Form`)
            }}>
                To fill the form
            </Button>

            <Button color="primary" variant="outlined" onClick={() => {
                navigate(`/Instructions`)
            }}>
                For instractions
            </Button>

        </>
    )
}
