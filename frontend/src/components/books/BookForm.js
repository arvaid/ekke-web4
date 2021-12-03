import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import config from "../../config";
import Loading from "../Loading";

const BookForm = () => {
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [authors, setAuthors] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    let isbn = location.state ? location.state.book.isbn : '';
    let title = location.state ? location.state.book.title : '';
    let author = location.state ? location.state.book.author : '';

    useEffect(() => {
        if (!isLoaded) {
            const url = `${config.API_URL}/authors`;
            fetch(url)
                .then(res => res.json())
                .then(data => setAuthors(data))
                .then(() => setIsLoaded(true));
        }
    });

    function handleTitleChange(e) {
        title = e.target.value;
    }

    function handleISBNChange(e) {
        isbn = e.target.value;
    }

    function handleAuthorChange(e) {
        author = authors[e.target.value];
    }

    if (!isLoaded) {
        return <Loading/>;
    }

    function handleSubmit(e) {
        const url = `${config.API_URL}/books/${location.state ? isbn : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const book = {
            isbn: isbn,
            title: title,
            author: author.id
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }).then(res => {
            if (res.status === 200) {
                navigate('/books');
            } else if (res.message) {
                setErrors([...errors, 'Hiba!']);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új könyv'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="bookISBN" className="form-label">ISBN</label>
                    <input type="text" className="form-control" id="bookISBN" maxLength="13"
                           placeholder="ISBN" defaultValue={isbn} onChange={handleISBNChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="bookTitle" className="form-label">Cím</label>
                    <input type="text" className="form-control" id="bookTitle"
                           placeholder="Cím" defaultValue={title} onChange={handleTitleChange}/>
                </div>
                <div className="mb3">
                    <label htmlFor="bookAuthor">Szerző</label>
                    <select id='bookAuthor' className="form-select" defaultValue={location.state ? author.name : 0}
                            onChange={handleAuthorChange}>
                        <option value='0' disabled>Kérem válassza ki a szerzőt!</option>
                        {authors.map((a, index) =>
                            <option key={a.id} value={index}>{a.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;