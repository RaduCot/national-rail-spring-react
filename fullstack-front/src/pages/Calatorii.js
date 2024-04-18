import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Calatorii() {
    const [calatorii, setCalatorii] = useState([]);
    const [filteredCalatorii, setFilteredCalatorii] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const id = useParams();

    useEffect(() => {
        loadCalatorii();
    }, []);

    const loadCalatorii = async () => {
        const result = await axios.get("http://localhost:8080/calatorii");
        setCalatorii(result.data);
        setFilteredCalatorii(result.data);
    }

    const deleteCalatorie = async (id) => {
        await axios.delete(`http://localhost:8080/calatorie/${id}`);
        loadCalatorii();
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const results = calatorii.filter(calatorie =>
            calatorie.data_plecare.toString().includes(value) ||
            calatorie.ora_plecare.toString().includes(value) ||
            calatorie.data_sosire.toString().includes(value) ||
            calatorie.ora_sosire.toString().includes(value) ||
            calatorie.loc_plecare.toLowerCase().includes(value) ||
            calatorie.loc_sosire.toLowerCase().includes(value) ||
            calatorie.id_transport.toString().includes(value)
        );

        setFilteredCalatorii(results);
    }

    const sortColumn = (columnName) => {
        const order = sortedColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortedColumn(columnName);

        const sortedData = [...filteredCalatorii].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Handle different data types (string, number, date)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        setFilteredCalatorii(sortedData);
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredCalatorii);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "calatorii.xlsx");
    }

    const importFromExcel = (e) => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const importedData = XLSX.utils.sheet_to_json(worksheet);

            setFilteredCalatorii(importedData);
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <div className='container'>
            <div className="row mt-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search entries"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-outline-primary mx-1" onClick={exportToExcel}>Export Excel</button>
                    <button className="btn btn-outline-primary mx-1" onClick={importFromExcel}>Import Excel</button>
                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                    <Link to="/journeys/add" className="btn btn-primary mx-1">Add Entry</Link>
                    <button className="btn btn-primary mx-1">Save</button>
                </div>
            </div>

            <div className='px-4 pt-4 border mt-3 rounded-2 shadow'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => sortColumn('data_plecare')}>Departure Date {sortedColumn === 'data_plecare' && sortOrder === 'asc' && '↑'}{sortedColumn === 'data_plecare' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('ora_plecare')}>Departure Time {sortedColumn === 'ora_plecare' && sortOrder === 'asc' && '↑'}{sortedColumn === 'ora_plecare' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('data_sosire')}>Arrival Date {sortedColumn === 'data_sosire' && sortOrder === 'asc' && '↑'}{sortedColumn === 'data_sosire' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('ora_sosire')}>Arrival Time {sortedColumn === 'ora_sosire' && sortOrder === 'asc' && '↑'}{sortedColumn === 'ora_sosire' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('loc_plecare')}>Departure Location {sortedColumn === 'loc_plecare' && sortOrder === 'asc' && '↑'}{sortedColumn === 'loc_plecare' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('loc_sosire')}>Arrival Location {sortedColumn === 'loc_sosire' && sortOrder === 'asc' && '↑'}{sortedColumn === 'loc_sosire' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('id_transport')}>Transport ID {sortedColumn === 'id_transport' && sortOrder === 'asc' && '↑'}{sortedColumn === 'id_transport' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCalatorii.map((calatorie, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{calatorie.data_plecare}</td>
                                <td>{calatorie.ora_plecare}</td>
                                <td>{calatorie.data_sosire}</td>
                                <td>{calatorie.ora_sosire}</td>
                                <td>{calatorie.loc_plecare}</td>
                                <td>{calatorie.loc_sosire}</td>
                                <td>{calatorie.id_transport}</td>
                                <td>
                                    <Link to={`/journeys/edit/${calatorie.id}`} className="btn btn-outline-primary mx-1">Edit</Link>
                                    <button onClick={() => deleteCalatorie(calatorie.id)} className="btn btn-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
