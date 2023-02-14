import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ChildForm from './ChildForm';
import React, { useContext } from 'react'
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Button, TextField, InputLabel, MenuItem, Select, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';


export default function Form() {

    const [children, setChildren] = useState();
    const [hasChildrten, setHasChildrten] = useState();
    const [isFinished, setIsFinished] = useState();
    const [showError, setShowError] = useState(false);
    const myContext = useContext(userContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = (data) => {
        var flag = true;
        myContext.childArr.map((a) => {
            if (a.ChildID == '' || a.DateOfBirth == '' || a.FullName == '') {
                alert('All fields are required!')
                flag = false;
            }
        })

        if (flag) {
            console.log(`!!!!!!!!!!! ${JSON.stringify(myContext.userState)}`)
            axios.post('https://localhost:44358/api/User', myContext.userState).then(
                res => {
                    console.log(res.data)
                    console.log(res.data.id)

                    console.log('tz parent enter')
                    console.log(res.data)
                    console.log(res.data.id)
                    var c = myContext.childArr;
                    for (let index = 0; index < c.length; index++) {
                        c[index].ParentId = +res.data.id;
                    }
                    myContext.setChildArr(c)
                    var a = myContext.childArr;
                    console.log(a.length)
                    console.log(myContext.childArr.length)

                    for (let index = 0; index < a.length; index++) {
                        debugger;
                        console.log(a[index], 'wwww')
                        axios.post('https://localhost:44358/api/Child', a[index]).then(
                            data => {
                                console.log(`saved successfully with data ${data}`)
                            }
                        )
                    }
                }
            )
            setIsFinished(true);
        }
    }

    const childfunction = (numOfChildren) => {
        const childArr = [];
        const childArr2 = [];
        for (let index = 0; index < numOfChildren; index++) {
            childArr.push(<ChildForm key={index} index={index} ></ChildForm>);
            childArr2.push({ ChildID: '', DateOfBirth: '', FullName: '', ParentId: '' });
        }
        myContext.setChildArr(childArr2);
        console.log(myContext.childArr);
        setChildren(childArr);
    }

    const exportToCsv = () => {

        let CsvString = "";
        CsvString += "FirstName:"
        CsvString += "\n"
        CsvString += myContext.userState.FirstName;
        CsvString += "\n"
        CsvString += "LastName:";
        CsvString += "\n"
        CsvString += myContext.userState.LastName;
        CsvString += "\n"
        CsvString += "IDNumber:";
        CsvString += "\n"
        CsvString += myContext.userState.UserId;
        CsvString += "\n"
        CsvString += "DateOfBirth:";
        CsvString += "\n"
        CsvString += myContext.userState.DateOfBirth;
        CsvString += "\n"
        CsvString += "gender:";
        CsvString += "\n"
        CsvString += myContext.userState.maleOrFemale;
        CsvString += "\n"
        CsvString += "HMO:";
        CsvString += "\n"
        CsvString += myContext.userState.Hmo;
        CsvString += "\n"

        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        var anchor = document.createElement("A");
        anchor.setAttribute("href", CsvString);
        anchor.setAttribute("download", myContext.userState.FirstName);
        document.body.append(anchor);
        anchor.click();
    }


    return (
        <div>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div >
                    <TextField type="text" name="UserId"
                        maxLength="9" id="outlined-basic"
                        margin="normal" label="Tz number"
                        variant="outlined" required="require"
                        {...register("UserId", {
                            required: true,
                            minLength: 9,
                            maxLength: 9
                        })
                        } onChange={(e) => {
                            var p = myContext.userState;
                            p.UserId = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.UserId} />
                </div>

                {errors.UserId && errors.UserId.type === 'required' && (
                    <p className="errorMsg">
                        Tz number is required.
                    </p>)}
                {errors.UserId && errors.UserId.type === 'minLength' && (
                    <p className="errorMsg">
                        Tz number should be at-least 9 numbers.
                    </p>)}
                {errors.UserId && errors.UserId.type === 'maxLength' && (
                    <p className="errorMsg">
                        Tz number shouldn't be more than 9 numbers.
                    </p>)}

                <div>
                    <TextField type="text" name="FirstName"
                        id="outlined-basic" margin="normal"
                        label="First name" variant="outlined"
                        required="require"
                        {...register("FirstName", {
                            required: true
                        })
                        } onChange={(e) => {
                            var p = myContext.userState;
                            p.FirstName = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.FirstName} />
                </div>
                {errors.FirstName && errors.FirstName.type === 'required' && (
                    <p className="errorMsg">first name is required.</p>
                )}
                <div>
                    <TextField type="text" name="LastName"
                        id="outlined-basic" margin="normal"
                        label="Last name" variant="outlined"
                        required="require"
                        {...register("LastName", {
                            required: true
                        })
                        } onChange={(e) => {
                            var p = myContext.userState;
                            p.LastName = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.LastName} />
                </div>
                {errors.LastName && errors.LastName.type === 'required' && (
                    <p className="errorMsg">last name is required.</p>
                )}

                <label >Date of birth</label>
                <div style={{ marginLeft: "80px" }}>
                    <TextField type="date" name="DateOfBirth"
                        id="outlined-controlled" margin="normal"
                        variant="outlined"
                        {...register("DateOfBirth", {
                            required: true
                        })
                        } onChange={(e) => {
                            var p = myContext.userState;
                            p.DateOfBirth = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.DateOfBirth} />
                </div>

                {errors.DateOfBirth && errors.DateOfBirth.type === 'required' && (
                    <p className="errorMsg">date of birth is required.</p>
                )}
               
                <div>
                    <InputLabel id="demo-simple-select-label" >Choose your Gender</InputLabel>
                    <Select  id="demo-simple-select" labelId="demo-simple-select-label"
                        onChange={(e) => {
                            var p = myContext.userState;
                            p.maleOrFemale = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.maleOrFemale}
                        required>                        
                        <MenuItem value="female">female</MenuItem>
                        <MenuItem value="male">male</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel id="demo-simple-select-label" >Choose your HMO</InputLabel>
                    <Select name="Hmo" id="demo-simple-select" labelId="demo-simple-select-label"
                        onChange={(e) => {
                            var p = myContext.userState;
                            p.Hmo = e.target.value;
                            myContext.setUserState(p)
                        }}
                        defaultValue={myContext.userState.Hmo}
                        required>
                        <MenuItem value="Macabi">Macabi</MenuItem>
                        <MenuItem value="Meuchedet">Meuchedet</MenuItem>
                        <MenuItem value="Klalit">Klalit</MenuItem>
                        <MenuItem value="Leumit">Leumit</MenuItem>
                    </Select>
                </div>

                <InputLabel id="demo-simple-select-label">Do you have children?</InputLabel>
                <Select onChange={(e) => {
                     setHasChildrten(e.target.value)
                      }} required>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                </Select>
                {
                    hasChildrten == 'yes' &&
                    <div>
                        <TextField id="outlined-number" type="number" name="numChildren" label="How many children?" onChange={(e) => { childfunction(e.target.value) }} />
                    </div>
                }

                {hasChildrten == 'yes' && children}

                {errors.numChildren && errors.numChildren.type === 'required' && (
                    <p className="errorMsg">required.</p>
                )}

                <div><Button color="primary" variant="outlined" type="submit"
                >finish</Button></div>
            </form>

            <Button color="primary" variant="outlined" onClick={() => {
                navigate(`/`)
            }}>
                Home
            </Button>

            {isFinished && <div><Button color="primary" variant="outlined" onClick={() => { exportToCsv(); setTimeout(() => { setIsFinished(false) }, 1000) }}>downLoad your details</Button></div>}
        </div>
    );
}