import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../Loading";
import config from "../../config";

const Books = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [books, setBooks] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
       if (!isLoaded) {
           const url = `${config.API_URL}/books`;
           fetch(url)
               .then(res => res.json())
               .then(data => setBooks(data))
               .then(() => setIsLoaded(true));
       }
    });

    function deleteBook(isbn) {
        const url = `${config.API_URL}/books/${isbn}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setBooks(books.filter(book => book.isbn !== isbn));
            } else {
                setErrors([...errors, `Hiba a törlés során!`]);
            }
        }).catch(() => {
        });
    }

    if (!isLoaded) {
        return <Loading/>;
    }

    return (
        <div>

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Könyvek</h1>
                </div>
                <div className='col-md-4 text-right'>
                    {/* TODO: align bottom-right */}
                    <Link to='/books/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Új hozzáadása</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ISBN</th>
                    <th>Cím</th>
                    <th>Szerző</th>
                    <th className='text-center'>Műveletek</th>
                </tr>
                </thead>
                <tbody>

                {books.map((book, index) =>

                    <tr key={book.isbn}>
                        <td>{index + 1}</td>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td className='text-center'>
                            <Link to={`/books/${book.isbn}`} state={{book: book}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Módosít
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteBook(book.isbn)}>
                                <i className="bi bi-trash-fill"/>&thinsp;
                                Töröl
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Books;