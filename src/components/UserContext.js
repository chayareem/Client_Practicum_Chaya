import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContext(props) {


    const [userState, setUserState] = useState({ FirstName: '', LastName: '', UserId: '', DateOfBirth: '', maleOrFemale: null, Hmo: null })
    const [childArr, setChildArr] = useState([]);

    // const [userIDNumber, setUserIDNumber] = useState();
    // const [userFirstname, setUserFirstname] = useState();
    // const [userLastname, setUserLastname] = useState();
    // const [userDate, setUserDate] = useState();
    // const [userGender, setUserGender] = useState();
    // const [userHMO, setUserHMO] = useState();
    // const [childIDNumber, setChildIDNumber] = useState();
    // const [childName, setChildName] = useState();
    // const [childDate, setChikdDate] = useState();
    // const [childrenArr,setChildrenArr]=useState();

    return (
        <userContext.Provider value={{ userState, setUserState, childArr, setChildArr }}>
            {props.children}
        </userContext.Provider>
    );

}