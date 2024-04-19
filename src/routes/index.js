import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/tasks" element={<Tasks/>} />
        </Routes>
    );
}

export default RoutesApp;