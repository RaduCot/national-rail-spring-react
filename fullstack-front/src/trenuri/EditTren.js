import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTren() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [tren, setTren] = React.useState({
        vagoane: "",
        masa: "",
        v_max: "",
    });

    const { vagoane, masa, v_max } = tren;

    const onInputChange = e => {
        setTren({ ...tren, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadTren();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/tren/${id}`, tren);
        navigate("/trains");
    }

    const loadTren = async () => {
        const result = await axios.get(`http://localhost:8080/tren/${id}`);
        setTren(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3 border rounded mt-2 p-4 shadow">
                    <h2 className='text-center m-4'>
                        Modify Train
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Vagoane' className='form-label'>Wagons</label>
                            <input type='number' className='form-control' name='vagoane' placeholder='Enter Wagons' value={vagoane} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Masa' className='form-label'>Weight</label>
                            <input type='number' className='form-control' name='masa' placeholder='Enter Weight' value={masa} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='V_max' className='form-label'>Max Speed</label>
                            <input type='number' className='form-control' name='v_max' placeholder='Enter Max Speed' value={v_max} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mx-2'>Modify</button>
                        <Link to="/trains" className='btn btn-outline-primary mx-2'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
