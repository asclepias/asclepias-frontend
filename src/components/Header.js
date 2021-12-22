import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const [state, setState] = useState({
        navCollapsed: true
    })

    const onToggleNav = () => {
        setState({navCollapsed: !state.navCollapsed})
    }

    const onNavClick = () => {
        setState({navCollapsed: true})
    }


    return (
        <header className="bg-primary container-fluid">
            <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark bg-primary g d-flex mb-0 px-0">
                <a className="navbar-brand mb-1" href="/">Asclepias</a>
                <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    onClick={onToggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={state.navCollapsed ? "collapse navbar-collapse": "navbar-collapse"} id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link" onClick={onNavClick}>Home</Link>
                        <Link to="/about" className="nav-item nav-link"  onClick={onNavClick}>About</Link>
                        <Link to="/entrysearch" className="nav-item nav-link" onClick={onNavClick}>Entry Search</Link>
                        <Link to="/metadatasearch" className="nav-item nav-link" onClick={onNavClick}>Metadata Search</Link>
                    </div>
                    <div className="navbar-text mb-1 ms-auto d-none d-lg-block">Citing Software, Making Science</div>
                </div>
            </nav>
            </div>
        </header>
    )
}

export default Header