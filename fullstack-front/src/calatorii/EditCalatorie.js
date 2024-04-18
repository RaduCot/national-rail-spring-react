import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditCalatorie() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [calatorie, setCalatorie] = React.useState({
        data_plecare: "",
        ora_plecare: "",
        data_sosire: "",
        ora_sosire: "",
        loc_plecare: "",
        loc_sosire: "",
        id_transport: "",
    });

    const { data_plecare, ora_plecare, data_sosire, ora_sosire, loc_plecare, loc_sosire, id_transport } = calatorie;

    const onInputChange = e => {
        setCalatorie({ ...calatorie, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadCalatorie();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/calatorie/${id}`, calatorie);
        navigate("/journeys");
    }

    const loadCalatorie = async () => {
        const result = await axios.get(`http://localhost:8080/calatorie/${id}`);
        setCalatorie(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3 border rounded mt-2 p-4 shadow">
                    <h2 className='text-center m-4'>
                        Modify Journey
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Data_plecare' className='form-label'>Departure Date</label>
                            <input type='date' className='form-control' name='data_plecare' placeholder='Enter Departure Date' value={data_plecare} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Ora_plecare' className='form-label'>Departure Time</label>
                            <input type='time' className='form-control' name='ora_plecare' placeholder='Enter Departure Time' value={ora_plecare} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Data_sosire' className='form-label'>Arrival Date</label>
                            <input type='date' className='form-control' name='data_sosire' placeholder='Enter Arrival Date' value={data_sosire} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Ora_sosire' className='form-label'>Arrival Time</label>
                            <input type='time' className='form-control' name='ora_sosire' placeholder='Enter Arrival Time' value={ora_sosire} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Loc_plecare' className='form-label'>Departure Location</label>
                            <input type='text' className='form-control' name='loc_plecare' placeholder='Enter Departure Location' value={loc_plecare} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Loc_sosire' className='form-label'>Arrival Location</label>
                            <input type='text' className='form-control' name='loc_sosire' placeholder='Enter Arrival Location' value={loc_sosire} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Id_transport' className='form-label'>Transport ID</label>
                            <input type='number' className='form-control' name='id_transport' placeholder='Enter Transport ID' value={id_transport} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mx-2'>Modify</button>
                        <Link to="/journeys" className='btn btn-outline-primary mx-2'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
