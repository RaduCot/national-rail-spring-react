import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Angajati() {
    const [angajati, setAngajati] = useState([]);
    const [filteredAngajati, setFilteredAngajati] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const id = useParams();

    useEffect(() => {
        loadAngajati();
    }, []);

    const loadAngajati = async () => {
        const result = await axios.get("http://localhost:8080/angajati");
        setAngajati(result.data);
        setFilteredAngajati(result.data);
    }

    const deleteAngajat = async (id) => {
        await axios.delete(`http://localhost:8080/angajat/${id}`);
        loadAngajati();
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const results = angajati.filter(angajat =>
            angajat.nume.toLowerCase().includes(value) ||
            angajat.prenume.toLowerCase().includes(value) ||
            angajat.cnp.toLowerCase().includes(value) ||
            angajat.functie.toLowerCase().includes(value) ||
            angajat.salariu.toString().includes(value)
        );

        setFilteredAngajati(results);
    }

    const sortColumn = (columnName) => {
        const order = sortedColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortedColumn(columnName);

        const sortedData = [...filteredAngajati].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Handle different data types (string, number, date)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        setFilteredAngajati(sortedData);
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredAngajati);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "angajati.xlsx");
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

            setFilteredAngajati(importedData);
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
                    <Link to="/employees/add" className="btn btn-primary mx-1">Add Entry</Link>
                    <button className="btn btn-primary mx-1">Save</button>
                </div>
            </div>

            <div className='px-4 pt-4 border mt-3 rounded-2 shadow'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => sortColumn('nume')}>Name {sortedColumn === 'nume' && sortOrder === 'asc' && '↑'}{sortedColumn === 'nume' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('prenume')}>Surname {sortedColumn === 'prenume' && sortOrder === 'asc' && '↑'}{sortedColumn === 'prenume' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('cnp')}>CNP {sortedColumn === 'cnp' && sortOrder === 'asc' && '↑'}{sortedColumn === 'cnp' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('functie')}>Function {sortedColumn === 'functie' && sortOrder === 'asc' && '↑'}{sortedColumn === 'functie' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('salariu')}>Salary {sortedColumn === 'salariu' && sortOrder === 'asc' && '↑'}{sortedColumn === 'salariu' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAngajati.map((angajat, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{angajat.nume}</td>
                                <td>{angajat.prenume}</td>
                                <td>{angajat.cnp}</td>
                                <td>{angajat.functie}</td>
                                <td>{angajat.salariu}</td>
                                <td>
                                    <Link to={`/employees/edit/${angajat.id}`} className="btn btn-outline-primary mx-1">Edit</Link>
                                    <button onClick={() => deleteAngajat(angajat.id)} className="btn btn-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
