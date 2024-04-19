import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";

import Private from "./Private";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/tasks" element={ <Private> <Tasks/> </Private> } />
        </Routes>
    );
}

export default RoutesApp;