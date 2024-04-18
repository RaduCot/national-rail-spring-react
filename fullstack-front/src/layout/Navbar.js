import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const getTitle = () => {
        const path = location.pathname;
        if (path.includes("/employees")) {
            return "NationalRail Database Management / Employees";
        }
        else if (path.includes("/tickets")) {
            return "NationalRail Database Management / Tickets";
        }
        else if (path.includes("/journeys")) {
            return "NationalRail Database Management / Journeys";
        }
        else if (path.includes("/transports")) {
            return "NationalRail Database Management / Transports";
        }
        else if (path.includes("/trains")) {
            return "NationalRail Database Management / Trains";
        }
        else {
            return "NationalRail Database Management";
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand mx-4" to="/">{getTitle()}</Link>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    );
}
