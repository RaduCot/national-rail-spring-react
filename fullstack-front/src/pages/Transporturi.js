import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Transporturi() {
    const [transporturi, setTransporturi] = useState([]);
    const [filteredTransporturi, setFilteredTransporturi] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const id = useParams();

    useEffect(() => {
        loadTransporturi();
    }, []);

    const loadTransporturi = async () => {
        const result = await axios.get("http://localhost:8080/transporturi");
        setTransporturi(result.data);
        setFilteredTransporturi(result.data);
    }

    const deleteTransport = async (id) => {
        await axios.delete(`http://localhost:8080/transport/${id}`);
        loadTransporturi();
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const results = transporturi.filter(transport =>
            transport.tip.toLowerCase().includes(value) ||
            transport.locuri.toString().includes(value) ||
            transport.specificatii.toLowerCase().includes(value) ||
            transport.id_tren.toString().includes(value) ||
            transport.id_angajat.toString().includes(value)
        );

        setFilteredTransporturi(results);
    }

    const sortColumn = (columnName) => {
        const order = sortedColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortedColumn(columnName);

        const sortedData = [...filteredTransporturi].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Handle different data types (string, number, date)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        setFilteredTransporturi(sortedData);
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredTransporturi);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "transporturi.xlsx");
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

            setFilteredTransporturi(importedData);
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
                    <Link to="/transports/add" className="btn btn-primary mx-1">Add Entry</Link>
                    <button className="btn btn-primary mx-1">Save</button>
                </div>
            </div>

            <div className='px-4 pt-4 border mt-3 rounded-2 shadow'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => sortColumn('tip')}>Type {sortedColumn === 'tip' && sortOrder === 'asc' && '↑'}{sortedColumn === 'tip' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('locuri')}>Seats {sortedColumn === 'locuri' && sortOrder === 'asc' && '↑'}{sortedColumn === 'locuri' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('specificatii')}>Specs {sortedColumn === 'specificatii' && sortOrder === 'asc' && '↑'}{sortedColumn === 'specificatii' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('id_tren')}>Train ID {sortedColumn === 'id_tren' && sortOrder === 'asc' && '↑'}{sortedColumn === 'id_tren' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('id_angajat')}>Employee ID {sortedColumn === 'id_angajat' && sortOrder === 'asc' && '↑'}{sortedColumn === 'id_angajat' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransporturi.map((transport, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{transport.tip}</td>
                                <td>{transport.locuri}</td>
                                <td>{transport.specificatii}</td>
                                <td>{transport.id_tren}</td>
                                <td>{transport.id_angajat}</td>
                                <td>
                                    <Link to={`/transports/edit/${transport.id}`} className="btn btn-outline-primary mx-1">Edit</Link>
                                    <button onClick={() => deleteTransport(transport.id)} className="btn btn-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
