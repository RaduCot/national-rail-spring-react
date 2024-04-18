import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    return (
        <div className='container'>
            <div className='container mt-4'>
                <h4>NationalRail DB Manager</h4>
                </div>

            <div className='row px-4 py-4 border mt-3 rounded-2 shadow'>
                <Link to="/employees" className="btn btn-primary p-2">Employees</Link>
                <Link to="/tickets" className="btn btn-primary p-2 mt-2">Tickets</Link>
                <Link to="/journeys" className="btn btn-primary p-2 mt-2">Journeys</Link>
                <Link to="/transports" className="btn btn-primary p-2 mt-2">Transports</Link>
                <Link to="/trains" className="btn btn-primary p-2 mt-2">Trains</Link>
            </div>
        </div>
    )
}
