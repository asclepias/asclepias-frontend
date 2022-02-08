import React from "react";
import logo from "../images/logo192.png"
import aasLogo from "../images/aas-logo.png"
import adsLogo from "../images/ads-logo.png"
import zenodoLogo from "../images/zenodo-logo.svg"
import sidratLogo from "../images/sidrat-logo.svg"
import wwLogo from "../images/WWLogotype70.png"

const partnerLogoStyle = {height: "70px", width:"auto"}

const Footer = () => {
    return (
        <footer className="py-5 mt-auto border-top bg-light">
            <div className="container"> 
                <div className="row border-bottom pb-4">
                    <div className="col-4">
                        <a href="/" className="d-flex align-items-center mb-0 link-dark text-decoration-none flex-wrap">
                            <img src={logo} alt="Asclepias" width="60" height="60" className="me-3"/>
                            <b className="fs-2">Asclepias</b>
                        </a>
                    </div>
                    <div className="col-8 text-left pt-2">
                        <b>The Asclepias Project</b> is a joint effort of the American Astronomical Society, the NASA Astrophysics Data System, Zenodo, and Sidrat Research, funded by the Alfred P. Sloan Foundation. 
                        <p className="text-muted pt-2">&copy; American Astronomical Society 2022</p>
                    </div>
                </div>
                <div className="row pt-5 d-flex justify-content-center">
                    <a href="https://www.aas.org/" style={partnerLogoStyle} className="my-2">
                        <img src={aasLogo} alt="The American Astronomical Society" style={partnerLogoStyle} className="mx-2"/>
                    </a>
                    <a href="https://www.zenodo.org/" style={partnerLogoStyle} className="my-2">
                    <img src={zenodoLogo} alt="Zenodo" style={partnerLogoStyle} className="mx-2"/>
                    </a>
                    <a href="https://ui.adsabs.harvard.edu/" style={partnerLogoStyle} className="my-2">
                    <img src={adsLogo} alt="NASA Astrophysics Data System" style={partnerLogoStyle} className="mx-2"/>
                    </a>
                    <a href="https://www.winterway.eu" style={partnerLogoStyle} className="my-2">
                    <img src={wwLogo} alt="Winter Way" style={partnerLogoStyle} className="mx-2"/>
                    </a>
                    <a href="https://www.sidratresearch.com/" style={partnerLogoStyle} className="my-2">
                    <img src={sidratLogo} alt="Sidrat Research" style={partnerLogoStyle} className="mx-2"/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer