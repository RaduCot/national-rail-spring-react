import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditAngajat() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [angajat, setAngajat] = React.useState({
        nume: "",
        prenume: "",
        cnp: "",
        functie: "",
        salariu: "",
    });

    const { nume, prenume, cnp, functie, salariu } = angajat;

    const onInputChange = e => {
        setAngajat({ ...angajat, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadAngajat();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/angajat/${id}`, angajat);
        navigate("/employees");
    }

    const loadAngajat = async () => {
        const result = await axios.get(`http://localhost:8080/angajat/${id}`);
        setAngajat(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3 border rounded mt-2 p-4 shadow">
                    <h2 className='text-center m-4'>
                        Modify Employee
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Nume' className='form-label'>Name</label>
                            <input type='text' className='form-control' name='nume' placeholder='Enter Name' value={nume} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Prenume' className='form-label'>Surname</label>
                            <input type='text' className='form-control' name='prenume' placeholder='Enter Surname' value={prenume} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Cnp' className='form-label'>CNP</label>
                            <input type='number' className='form-control' name='cnp' placeholder='Enter CNP' value={cnp} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Functie' className='form-label'>Function</label>
                            <input type='text' className='form-control' name='functie' placeholder='Enter Function' value={functie} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Salariu' className='form-label'>Salary</label>
                            <input type='number' className='form-control' name='salariu' placeholder='Enter Salary' value={salariu} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mx-2'>Modify</button>
                        <Link to="/employees" className='btn btn-outline-primary mx-2'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
