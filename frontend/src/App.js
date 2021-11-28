import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Authors from "./components/authors/Authors";
import AuthorForm from "./components/authors/AuthorForm";

function App() {
    return (
        <>
            <Navbar/>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Navigate to="/authors"/>}/>
                    <Route path="/authors" element={<Authors/>}/>
                    <Route path="/authors/:id" element={<AuthorForm/>}/>
                    <Route path="/authors/new" element={<AuthorForm/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
