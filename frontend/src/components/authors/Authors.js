import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Loading from "../Loading";
import config from "../../config";

const Authors = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!isLoaded) {
            const url = `${config.API_URL}/authors`;
            fetch(url)
                .then(res => res.json())
                .then(data => setAuthors(data))
                .then(() => setIsLoaded(true));
        }
    });

    function deleteAuthor(id) {
        const url = `${config.API_URL}/authors/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                setAuthors(authors.filter(author => author.id !== id));
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
            {errors}

            <div className='row align-items-bottom'>
                <div className='col-md-8'>
                    <h1>Szerzők</h1>
                </div>
                <div className='col-md-4 text-right'>
                    {/* TODO: align bottom-right */}
                    <Link to='/authors/new' className='btn btn-primary'>
                        <strong><i className="bi bi-plus-lg"/>&nbsp;Új hozzáadása</strong>
                    </Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Név</th>
                    <th className='text-center'>Műveletek</th>
                </tr>
                </thead>
                <tbody>

                {authors.map((author, index) =>
                    <tr key={author.id}>
                        <td>{index + 1}</td>
                        <td>{author.name}</td>
                        <td className='text-center'>
                            <Link to={`/authors/${author.id}`} state={{author: author}}
                                  className='btn btn-outline-primary btn-sm'>
                                <i className="bi bi-pencil-fill"/>&thinsp;
                                Módosít
                            </Link>
                            &nbsp;

                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => deleteAuthor(author.id)}>
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

export default Authors;
