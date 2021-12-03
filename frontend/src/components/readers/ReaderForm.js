import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";

import config from "../../config";

const ReaderForm = () => {
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let name = location.state ? location.state.reader.name : '';
    let registration_date = location.state ?
        dayjs(location.state.reader.registration_date) : dayjs();

    const handleSubmit = (e) => {
        const url = `${config.API_URL}/readers/${location.state ? id : ''}`;
        const method = location.state ? 'PUT' : 'POST';

        const reader = {
            id: id,
            name: name,
            registration_date: registration_date.format('YYYY-M-D HH:mm:ss')
        };
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reader)
        }).then(res => {
            if (res.status === 200) {
                navigate('/readers');
            } else if (res.message) {
                setErrors([...errors, `Hiba!`]);
            }
        }).catch(() => {
        });

        e.preventDefault();
    }

    const handleNameChange = (e) => {
        name = e.target.value;
    }

    return (
        <div>
            {errors}
            <h1>{location.state ? 'Szerkesztés' : 'Új olvasó'}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="readerName" className="form-label">Név</label>
                    <input type="text" className="form-control" id="readerName"
                           placeholder="Név" defaultValue={name} onChange={handleNameChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="readerRegDate" className="form-label">Regisztráció dátuma</label>
                    <input type="date" className="form-control" id="readerRegDate"
                           placeholder="Regisztrácós dátum" readOnly value={registration_date.format('YYYY-M-D HH:mm:ss')}/>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSubmit}>Mentés</button>
                </div>
            </form>
        </div>
    );
}

export default ReaderForm;