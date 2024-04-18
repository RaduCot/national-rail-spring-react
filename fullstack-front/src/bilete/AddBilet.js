import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBilet() {
    let navigate = useNavigate();

    const [bilet, setBilet] = React.useState({
        data_emitenta: "",
        clasa: "",
        vagon: "",
        loc: "",
        pret: "",
        tip_discount: "",
        id_calatorie: "",
        id_angajat: "",
    });

    const { data_emitenta, clasa, vagon, loc, pret, tip_discount, id_calatorie, id_angajat } = bilet;

    const onInputChange = e => {
        setBilet({ ...bilet, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:8080/bilet", bilet);
        navigate("/tickets");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3 border rounded mt-2 p-4 shadow">
                    <h2 className='text-center m-4'>
                        Register Ticket
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                    <div className='mb-3'>
                            <label htmlFor='data_emitenta' className='form-label'>Issue Date</label>
                            <input type='date' className='form-control' name='data_emitenta' placeholder='Enter Issue Date' value={data_emitenta} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='clasa' className='form-label'>Class</label>
                            <input type='number' className='form-control' name='clasa' placeholder='Enter Class' value={clasa} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='vagon' className='form-label'>Wagon</label>
                            <input type='number' className='form-control' name='vagon' placeholder='Enter Wagon' value={vagon} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='loc' className='form-label'>Seat</label>
                            <input type='number' className='form-control' name='loc' placeholder='Enter Seat' value={loc} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='pret' className='form-label'>Price</label>
                            <input type='number' className='form-control' name='pret' placeholder='Enter Price' value={pret} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='tip_discount' className='form-label'>Discount Type</label>
                            <input type='text' className='form-control' name='tip_discount' placeholder='Enter Discount Type' value={tip_discount} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='id_calatorie' className='form-label'>Journey ID</label>
                            <input type='number' className='form-control' name='id_calatorie' placeholder='Enter Journey ID' value={id_calatorie} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='id_angajat' className='form-label'>Employee ID</label>
                            <input type='number' className='form-control' name='id_angajat' placeholder='Enter Employee ID' value={id_angajat} onChange={(e) => onInputChange(e)} />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block mx-2'>Register</button>
                        <Link to="/tickets" className='btn btn-outline-primary mx-2'>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
