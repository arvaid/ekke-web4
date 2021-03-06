import React, {useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import config from "../../config";

const AuthorForm = () => {
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let name = location.state ? location.state.author.name : '';

    const handleSubmit = (e) => {
        const url =  `${config.API_URL}/authors/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const author = {id: id, name: name};
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(author)
        }).then(res => {
            if (res.status === 200) {
                navigate('/authors');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {});

        e.preventDefault();
    }

    const handleChange = (e) => {
        name = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új szerző'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="authorName" className="form-label">Név</label>
                    <input type="text" className="form-control" id="authorName"
                           placeholder="Név" defaultValue={name} onChange={handleChange}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default AuthorForm;
