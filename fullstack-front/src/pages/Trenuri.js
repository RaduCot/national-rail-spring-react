import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Trenuri() {
    const [trenuri, setTrenuri] = useState([]);
    const [filteredTrenuri, setFilteredTrenuri] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const id = useParams();

    useEffect(() => {
        loadTrenuri();
    }, []);

    const loadTrenuri = async () => {
        const result = await axios.get("http://localhost:8080/trenuri");
        setTrenuri(result.data);
        setFilteredTrenuri(result.data);
    }

    const deleteTren = async (id) => {
        await axios.delete(`http://localhost:8080/tren/${id}`);
        loadTrenuri();
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const results = trenuri.filter(tren =>
            tren.vagoane.toString().includes(value) ||
            tren.masa.toString().includes(value) ||
            tren.v_max.toString().includes(value)
        );

        setFilteredTrenuri(results);
    }

    const sortColumn = (columnName) => {
        const order = sortedColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortedColumn(columnName);

        const sortedData = [...filteredTrenuri].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Handle different data types (string, number, date)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        setFilteredTrenuri(sortedData);
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredTrenuri);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "trenuri.xlsx");
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

            setFilteredTrenuri(importedData);
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
                    <Link to="/trains/add" className="btn btn-primary mx-1">Add Entry</Link>
                    <button className="btn btn-primary mx-1">Save</button>
                </div>
            </div>

            <div className='px-4 pt-4 border mt-3 rounded-2 shadow'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => sortColumn('vagoane')}>Wagons {sortedColumn === 'vagoane' && sortOrder === 'asc' && '↑'}{sortedColumn === 'vagoane' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('masa')}>Weight {sortedColumn === 'masa' && sortOrder === 'asc' && '↑'}{sortedColumn === 'masa' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('v_max')}>Max Speed {sortedColumn === 'v_max' && sortOrder === 'asc' && '↑'}{sortedColumn === 'v_max' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrenuri.map((tren, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{tren.vagoane}</td>
                                <td>{tren.masa}</td>
                                <td>{tren.v_max}</td>
                                <td>
                                    <Link to={`/trains/edit/${tren.id}`} className="btn btn-outline-primary mx-1">Edit</Link>
                                    <button onClick={() => deleteTren(tren.id)} className="btn btn-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
