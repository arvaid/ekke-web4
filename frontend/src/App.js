import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Books from "./components/books/Books";
import BookForm from "./components/books/BookForm";
import Authors from "./components/authors/Authors";
import AuthorForm from "./components/authors/AuthorForm";
import Readers from "./components/readers/Readers";
import ReaderForm from "./components/readers/ReaderForm";

function App() {
    return (
        <>
            <Navbar/>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Navigate to="/books"/>}/>
                    <Route path="/books" element={<Books/>}/>
                    <Route path="/books/:id" element={<BookForm/>}/>
                    <Route path="/books/new" element={<BookForm/>}/>
                    <Route path="/authors" element={<Authors/>}/>
                    <Route path="/authors/:id" element={<AuthorForm/>}/>
                    <Route path="/authors/new" element={<AuthorForm/>}/>
                    <Route path="/readers" element={<Readers/>}/>
                    <Route path="/readers/:id" element={<ReaderForm/>}/>
                    <Route path="/readers/new" element={<ReaderForm/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
