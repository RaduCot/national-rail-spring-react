import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Bilete() {
    const [bilete, setBilete] = useState([]);
    const [filteredBilete, setFilteredBilete] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const id = useParams();

    useEffect(() => {
        loadBilete();
    }, []);

    const loadBilete = async () => {
        const result = await axios.get("http://localhost:8080/bilete");
        setBilete(result.data);
        setFilteredBilete(result.data);
    }

    const deleteBilet = async (id) => {
        await axios.delete(`http://localhost:8080/bilet/${id}`);
        loadBilete();
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const results = bilete.filter(bilet =>
            bilet.data_emitenta.toString().includes(value) ||
            bilet.clasa.toLowerCase().includes(value) ||
            bilet.vagon.toLowerCase().includes(value) ||
            bilet.loc.toLowerCase().includes(value) ||
            bilet.pret.toString().includes(value) ||
            bilet.tip_discount.toLowerCase().includes(value) ||
            bilet.id_calatorie.toString().includes(value) ||
            bilet.id_angajat.toString().includes(value)
        );

        setFilteredBilete(results);
    }

    const sortColumn = (columnName) => {
        const order = sortedColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(order);
        setSortedColumn(columnName);

        const sortedData = [...filteredBilete].sort((a, b) => {
            const aValue = a[columnName];
            const bValue = b[columnName];

            // Handle different data types (string, number, date)
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return order === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });

        setFilteredBilete(sortedData);
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredBilete);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "bilete.xlsx");
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

            setFilteredBilete(importedData);
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
                    <Link to="/tickets/add" className="btn btn-primary mx-1">Add Entry</Link>
                    <button className="btn btn-primary mx-1">Save</button>
                </div>
            </div>

            <div className='px-4 pt-4 border mt-3 rounded-2 shadow'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" onClick={() => sortColumn('data_emitenta')}>Issue Date {sortedColumn === 'data_emitenta' && sortOrder === 'asc' && '↑'}{sortedColumn === 'data_emitenta' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('clasa')}>Class {sortedColumn === 'clasa' && sortOrder === 'asc' && '↑'}{sortedColumn === 'clasa' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('vagon')}>Wagon {sortedColumn === 'vagon' && sortOrder === 'asc' && '↑'}{sortedColumn === 'vagon' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('loc')}>Seat {sortedColumn === 'loc' && sortOrder === 'asc' && '↑'}{sortedColumn === 'loc' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('pret')}>Price {sortedColumn === 'pret' && sortOrder === 'asc' && '↑'}{sortedColumn === 'pret' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('tip_discount')}>Discount Type {sortedColumn === 'tip_discount' && sortOrder === 'asc' && '↑'}{sortedColumn === 'tip_discount' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('id_calatorie')}>Journey ID {sortedColumn === 'id_calatorie' && sortOrder === 'asc' && '↑'}{sortedColumn === 'id_calatorie' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col" onClick={() => sortColumn('id_angajat')}>Employee ID {sortedColumn === 'id_angajat' && sortOrder === 'asc' && '↑'}{sortedColumn === 'id_angajat' && sortOrder === 'desc' && '↓'}</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBilete.map((bilet, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{bilet.data_emitenta}</td>
                                <td>{bilet.clasa}</td>
                                <td>{bilet.vagon}</td>
                                <td>{bilet.loc}</td>
                                <td>{bilet.pret}</td>
                                <td>{bilet.tip_discount}</td>
                                <td>{bilet.id_calatorie}</td>
                                <td>{bilet.id_angajat}</td>
                                <td>
                                    <Link to={`/tickets/edit/${bilet.id}`} className="btn btn-outline-primary mx-1">Edit</Link>
                                    <button onClick={() => deleteBilet(bilet.id)} className="btn btn-danger mx-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
