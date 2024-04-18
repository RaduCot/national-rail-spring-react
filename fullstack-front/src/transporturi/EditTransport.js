import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTransport() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [transport, setTransport] = React.useState({
        tip: "",
        locuri: "",
        specificatii: "",
        id_tren: "",
        id_angajat: "",
    });

    const { tip, locuri, specificatii, id_tren, id_angajat } = transport;

    const onInputChange = e => {
        setTransport({ ...transport, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadTransport();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/transport/${id}`, transport);
        navigate("/transports");
    }

    const loadTransport = async () => {
        const result = await axios.get(`http://localhost:8080/transport/${id}`);
        setTransport(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3 border rounded mt-2 p-4 shadow">
                    <h2 className='text-center m-4'>
                        Modify Transport
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                    <div className='mb-3'>
                            <label htmlFor='Tip' className='form-label'>Type</label>
                            <input type='text' className='form-control' name='tip' placeholder='Enter Type' value={tip} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Locuri' className='form-label'>Seats</label>
                            <input type='number' className='form-control' name='locuri' placeholder='Enter Seats' value={locuri} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Specificatii' className='form-label'>Specifications</label>
                            <input type='text' className='form-control' name='specificatii' placeholder='Enter Specifications' value={specificatii} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Id_tren' className='form-label'>Train ID</label>
                            <input type='number' className='form-control' name='id_tren' placeholder='Enter Train ID' value={id_tren} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Id_angajat' className='form-label'>Employee ID</label>
                            <input type='number' className='form-control' name='id_angajat' placeholder='Enter Employee ID' value={id_angajat} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mx-2'>Modify</button>
                        <Link to="/transports" className='btn btn-outline-primary mx-2'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
