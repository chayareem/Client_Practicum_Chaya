import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContext(props) {

    const [userState, setUserState] = useState({ FirstName: '', LastName: '', UserId: '', DateOfBirth: '', maleOrFemale: null, Hmo: null })
    const [childArr, setChildArr] = useState([]);

    return (
        <userContext.Provider value={{ userState, setUserState, childArr, setChildArr }}>
            {props.children}
        </userContext.Provider>
    );

}
