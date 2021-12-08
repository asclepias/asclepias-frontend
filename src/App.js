import './custom.scss'
import React from "react"
import { Routes, Route, Link } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import MetadataSearchForm from "./MetadataSearchForm"
import { Container } from 'react-bootstrap'
import NoContent from './routes/nocontent'
import EntrySearch from './routes/entrysearch'
import SoftwareEntry from './routes/softwareentry'
import MetadataSearch from './routes/metadatasearch'

export default function App() {
    document.title = "Asclepias: Citing Software, Making Science"
    return (
        <React.StrictMode>
            <Container fluid className="p-0 m-0">
                <Header />

                <Container>

                <Link to="/" className="btn btn-primary m-2">Home</Link>
                <Link to="/entrysearch" className="btn btn-primary m-2">Entry Search</Link>
                <Link to="/metadatasearch" className="btn btn-primary m-2">Metadata Search</Link>

                <Routes>
                    <Route path="/" exact element={<MetadataSearchForm/>} />
                    <Route path="/entrysearch" element={<EntrySearch />} />
                    <Route path="/entry" element={<SoftwareEntry />}>
                        <Route path=":searchquery" element={<SoftwareEntry/>} />
                    </Route>
                    <Route path="/metadatasearch" element={<MetadataSearch />} /> 
                    <Route path="*" element={<NoContent/>} />
                </Routes>

                </Container>

                <Footer />
            </Container>
    </React.StrictMode>
    );
}

