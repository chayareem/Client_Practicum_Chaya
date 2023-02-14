import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import ChildForm from './ChildForm'
import Instructions from './Instructions'
import UserContext from './UserContext'



export default function MyRouter() {

    return (
        <div>
            {/* <div> <Link to="/Form">Form</Link></div>
            <div> <Link to="/ChildForm">ChildForm</Link></div>
            <div> <Link to="/Instructions">Instructions</Link></div> */}

            <Routes>
                <Route path='/' element={<UserContext><Home /></UserContext>} />
                <Route path='/Home' element={<UserContext><Home /></UserContext>} />
                <Route path='/Form' element={<UserContext><Form /></UserContext>} />
                <Route path='/ChildForm' element={<UserContext><ChildForm /></UserContext>} />
                <Route path='/Instructions' element={<UserContext><Instructions /></UserContext>} />
            </Routes>
        </div>
    )



}