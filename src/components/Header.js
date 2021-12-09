import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-primary container-fluid">
            <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary g d-flex mb-3 px-0">
                <a className="navbar-brand mb-1" href="/">Asclepias</a>
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    <Link to="/entrysearch" className="nav-item nav-link">Entry Search</Link>
                    <Link to="/metadatasearch" className="nav-item nav-link">Metadata Search</Link>
                </div>
                <div className="navbar-text mb-1 ms-auto">Citing Software, Making Science</div>
            </nav>
            </div>
        </header>
    )
}

export default Header