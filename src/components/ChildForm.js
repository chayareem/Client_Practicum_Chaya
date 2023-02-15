import React, { useContext } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from './UserContext';
import { Button, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';

export default function ChildForm(props) {
    const myContext = useContext(userContext);
    
    const {
        register,
        formState: { errors },
    } = useForm();

    return (

        <form >

            <TextField id="outlined-basic" label="ID number" variant="outlined" margin="normal" type="text" name="IDNum" required="require"
                onChange={(e) => {
                    var c = myContext.childArr;
                    c[props.index].ChildID = e.target.value;
                    myContext.setChildArr(c)
                }} />

            {errors.IDNum && errors.IDNum.type === 'required' && (
                <p className="errorMsg">
                    ID number is required.
                </p>)}

            <TextField id="outlined-basic" label="Name" variant="outlined" margin="normal" type="text" name="name" required="require" {...register("name", {
                required: true
            })} onChange={(e) => { var c = myContext.childArr; c[props.index].FullName = e.target.value; myContext.setChildArr(c) }} />

            {errors.name && errors.name.type === 'required' && (
                <p className="errorMsg">
                    name is required.
                </p>)}


            {/* <label >Date of birth</label> */}
            <TextField id="outlined-controlled" variant="outlined" margin="normal" type="date" name="dateOfBirth" required="require"{...register("dateOfBirth", {
                required: true
            })} onChange={(e) => { var c = myContext.childArr; c[props.index].DateOfBirth = e.target.value; myContext.setChildArr(c) }} />

            {errors.dateOfBirth && errors.dateOfBirth.type === 'required' && (
                <p className="errorMsg">
                    date of birth is required.
                </p>)}

        </form>

    )
}
